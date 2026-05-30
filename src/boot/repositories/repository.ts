import { Kysely, type SelectType, type Transaction, type Updateable } from 'kysely';
import type { IDatabase, TInsertable } from '@/boot/database/schemas/index.schema.js';
import HTTPError from '@/boot/http/http.error.js';
import { ENTITY_BY_TABLE } from '@/boot/enums/entities.enum.js';
import { capitalize } from '@/boot/utils/capitalize.js';
import type { TDeleteParams, TPaginateMeta, TPaginateParams, TQuery, TSelectParams, TUpdateParams, TWhereParams } from '@/boot/types/repository.types.js';


export default abstract class Repository<TTable extends keyof IDatabase> {

  public readonly abstract tableName: TTable;
  public readonly abstract softDeletable: boolean;
  protected readonly abstract db: Kysely<IDatabase>;

  protected qr(withTrash = false) {
    const { table, ref } = this.db.dynamic;

    return this.db
      .selectFrom(table(this.tableName).as('t'))
      .selectAll('t')
      .$if(this.softDeletable && !withTrash, (qb) => qb.where(ref('t.deletedAt'), 'is', null));
  }

  protected applyBuild<T extends TQuery>(
    query: T,
    build?: ((qb: T) => T) | Array<(qb: T) => T>
  ): T {
    let q = query;

    if (!build) {
      return q;
    }

    const scopes = Array.isArray(build)
      ? build
      : [build];

    for (const scope of scopes) {
      q = scope(q);
    }

    return q;
  }

  public async paginate({
    page = 1,
    limit = 15,
    withTrash = false,
    build
  }: TPaginateParams) {

    const { ref } = this.db.dynamic;

    const pageLimit = Math.min(limit, 100);
    const offset = (page - 1) * pageLimit;

    const baseQuery = this.applyBuild(
      this.qr(withTrash),
      build
    );

    const dataQuery = baseQuery
      .offset(offset)
      .limit(pageLimit)
      .orderBy(ref('t.createdAt'), 'desc')
      .orderBy('t.id', 'asc');

    const countQuery = baseQuery
      .clearSelect()
      .clearLimit()
      .clearOffset()
      .select((eb) => eb.fn.countAll().as('total'));

    const [data, count] = await Promise.all([
      dataQuery.execute(),
      countQuery.executeTakeFirst()
    ]);

    const totalRecords = Number(count?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageLimit)
    );

    const next = page < totalPages ? page + 1 : totalPages;
    const prev = page > 1 ? page - 1 : 1;

    const meta: TPaginateMeta = {
      page,
      next,
      prev,
      first: 1,
      last: totalPages,
      limit: pageLimit,
      total: totalRecords
    };

    return {
      data,
      meta
    };
  }

  public async all({
    withTrash = false
  }: TSelectParams = {}) {
    return await this.qr(withTrash).execute();
  }

  public async first<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    { column, value, withTrash = false }:
      TWhereParams<Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(withTrash);

    return await qr
      .where(ref(`t.${column}`), '=', value)
      .orderBy('t.id')
      .executeTakeFirstOrThrow(
        () => HTTPError.notFound({
          message: `${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
          detail: { path: column, message: `with value: ${value}` }
        })
      );
  }

  public async get<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    { column, value, withTrash = false }:
      TWhereParams<Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(withTrash);
    return await qr
      .where(ref(`t.${column}`), '=', value)
      .orderBy('t.id')
      .execute();
  }

  public async insert<T extends TInsertable[TTable]>(data: T, trx?: Transaction<IDatabase>) {
    const executer = trx ?? this.db;
    return await executer.insertInto(this.tableName).values(data).returningAll().executeTakeFirstOrThrow(
      () => HTTPError.internalServer({ message: `Failed to insert and retrieve data in ${ENTITY_BY_TABLE[this.tableName]}` })
    );
  }

  public async update<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    data: Updateable<IDatabase[TTable]>,
    { column, value }: TUpdateParams<Column, Value>,
    trx?: Transaction<IDatabase>
  ) {
    const { table, ref } = this.db.dynamic;
    const executer = trx ?? this.db;

    return await executer.updateTable(table(this.tableName).as('t'))
      .set(data as any).where(ref(`${column}`), '=', value)
      .returningAll()
      .executeTakeFirstOrThrow(
        () => HTTPError.notFound({
          message: `Failed to update record. ${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
          detail: { path: column, message: `with value: ${value}` }
        })
      );
  }
  public async delete<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    { column, value }: TDeleteParams<Column, Value>,
    trx?: Transaction<IDatabase>
  ) {
    const { table, ref } = this.db.dynamic;
    const executer = trx ?? this.db;

    await executer.deleteFrom(table(this.tableName).as('t')).where(ref(`t.${column}`), '=', value).executeTakeFirstOrThrow(
      () => HTTPError.notFound({
        message: `Failed to delete record. ${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
        detail: { path: column, message: `with value: ${value}` }
      })
    );
  }

  public async transaction(callback: (trx: Transaction<IDatabase>) => Promise<unknown>) {
    return await this.db.transaction().execute(callback);
  }

}