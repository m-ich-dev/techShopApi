import { Kysely, type SelectType, type Transaction, type Updateable } from "kysely";
import type { IDatabase, TInsertable } from "@/boot/database/schemas/index.schema.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import type { TDeleteParams, TPaginateMeta, TPaginateParams, TSelectParams, TUpdateParams, TWhereParams } from "@/boot/types/repository.types.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default abstract class Repository<TTable extends keyof IDatabase> {

  public readonly abstract tableName: TTable;
  public readonly abstract softDeletable: boolean;
  protected readonly abstract db: Kysely<IDatabase>;

  protected qr(withTrash: boolean = false) {
    const { table, ref } = this.db.dynamic;

    return this.db
      .selectFrom(table(this.tableName).as('t'))
      .selectAll('t')
      .$if(this.softDeletable && !withTrash, (qb) => qb.where(ref('t.deletedAt'), 'is', null));
  }

  protected async counter(withTrash: boolean = false) {
    const { table, ref } = this.db.dynamic;

    return this.db
      .selectFrom(table(this.tableName).as('t'))
      .select((eb) => eb.fn.countAll().as('total'))
      .$if(this.softDeletable && !withTrash, (qb) => qb.where(ref('t.deletedAt'), 'is', null))
      .executeTakeFirst();
  }

  public async all(
    { withTrash = false }:
      TSelectParams
  ) {
    return await this.qr(withTrash).execute();
  }

  public async paginate(
    {
      page = 1,
      limit = 15,
      withTrash = false
    }:
      TPaginateParams
  ) {
    const { ref } = this.db.dynamic;

    const pageLimit = Math.min(limit, 100);
    const offset = (page - 1) * pageLimit;

    const [data, count] = await Promise.all([
      this.qr(withTrash)
        .offset(offset)
        .limit(pageLimit)
        .orderBy(ref('createdAt'), 'desc')
        .orderBy('id', 'asc')
        .execute(),
      this.counter(withTrash)
    ]);
    const totalRecords = Number(count?.total);
    const totalPages = Math.ceil(totalRecords / pageLimit);
    const next = page < totalPages ? page + 1 : totalPages;
    const prev = page > 1 ? page - 1 : 1;

    const meta: TPaginateMeta = {
      page,
      next,
      prev,
      last: totalPages,
      first: 1,
      limit: pageLimit,
      total: totalRecords
    };

    return {
      data,
      meta
    };
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