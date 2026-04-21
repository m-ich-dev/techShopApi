import { Kysely, SelectType, sql, Updateable } from "kysely";
import { IDatabase, TInsertable } from "../database/schemas/index.schema";
import HTTPError from "../http/http.error";
import { ENTITY_BY_TABLE } from "../enums/entities.enum";
import { TDeleteParams, TSelectParams, TSoftDeleteParams, TUpdateParams, TWhereParams } from "../types/repository.types";
import { capitalize } from "../utils/capitalize";

export default abstract class Repository<TTable extends keyof IDatabase> {

  readonly abstract tableName: TTable;
  readonly abstract softDeletable: boolean;
  protected readonly abstract db: Kysely<IDatabase>

  protected qr(tableName: TTable, withTrash: boolean) {
    const { table, ref } = this.db.dynamic;

    let query = this.db
      .selectFrom(table(tableName).as('t'))
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
    { tableName = this.tableName, column, value, withTrash = false }:
      TWhereParams<TTable, Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(tableName, withTrash);

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
    { tableName = this.tableName, column, value, withTrash = false }:
      TWhereParams<TTable, Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(tableName, withTrash);
    return await qr
      .where(ref(`t.${column}`), '=', value)
      .orderBy('t.id')
      .execute();
  }

  public async all(
    { tableName = this.tableName, withTrash = false }:
      TSelectParams<TTable>
  ) {
    return await this.qr(tableName, withTrash).execute();
  }

  public async insert<T extends TInsertable[TTable]>(data: T[]): Promise<T[]>;
  public async insert<T extends TInsertable[TTable]>(data: T): Promise<T>;
  public async insert<T extends TInsertable[TTable]>(data: T | T[]) {
    const qr = Array.isArray(data) ?
      this.db.insertInto(this.tableName).values(data).returningAll().execute() :
      this.db.insertInto(this.tableName).values(data).returningAll().executeTakeFirstOrThrow(
        () => HTTPError.internalServer({ message: `Failed to insert and retrieve data in ${ENTITY_BY_TABLE[this.tableName]}` })
      );
    return await qr;
  }
  public async update<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    data: Updateable<IDatabase[TTable]>,
    { tableName = this.tableName, column, value }: TUpdateParams<TTable, Column, Value>
  ) {
    const { table, ref } = this.db.dynamic;
    return await this.db.updateTable(table(tableName).as('t'))
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
  >({ tableName = this.tableName, column, value }: TDeleteParams<TTable, Column, Value>) {
    const { table, ref } = this.db.dynamic;
    await this.db.deleteFrom(table(tableName).as('t')).where(ref(`t.${column}`), '=', value).executeTakeFirstOrThrow(
      () => HTTPError.notFound({
        message: `Failed to delete record. ${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
        detail: { path: column, message: `with value: ${value}` }
      })
    );
  }
  public async softDelete<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >({ column, value }:
    TSoftDeleteParams<Column, Value>) {
    const { table, ref } = this.db.dynamic;
    if (this.softDeletable) {
      return await this.db.updateTable(table(this.tableName).as('t'))
        .set({ deletedAt: sql`now()` } as any).where(ref('deletedAt'), 'is', null).where(ref(`${column}`), '=', value)
        .returningAll()
        .executeTakeFirstOrThrow(
          () => HTTPError.notFound({
            message: `Failed to soft delete record. ${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
            detail: { path: column, message: `with value: ${value}` }
          })
        );
    } else {
      throw HTTPError.badRequest({ message: `Soft delete not supported for ${ENTITY_BY_TABLE[this.tableName]}` });
    }
  }
}