import { Kysely, SelectType, Transaction, Updateable } from "kysely";
import { IDatabase, TInsertable } from "../database/schemas/index.schema";
import HTTPError from "../http/http.error";
import { ENTITY_BY_TABLE } from "../enums/entities.enum";
import { TDeleteParams, TSelectParams, TUpdateParams, TWhereParams } from "../types/repository.types";
import { capitalize } from "../utils/capitalize";

export default abstract class Repository<TTable extends keyof IDatabase> {

  public readonly abstract tableName: TTable;
  public readonly abstract softDeletable: boolean;
  protected readonly abstract db: Kysely<IDatabase>;

  protected qr(withTrash: boolean = false) {
    const { table, ref } = this.db.dynamic;

    let query = this.db
      .selectFrom(table(this.tableName).as('t'))
      .selectAll();

    if (this.softDeletable && !withTrash) {
      query = query.where(ref('t.deletedAt'), 'is', null);
    }

    return query;
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

  public async all(
    { withTrash = false }:
      TSelectParams
  ) {
    return await this.qr(withTrash).execute();
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