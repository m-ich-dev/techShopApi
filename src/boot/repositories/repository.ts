import { Kysely, SelectType } from "kysely";
import { IDatabase, TInsertable } from "../database/schemas/index.schema";
import HTTPError from "../http/http.error";
import { ENTITY_BY_TABLE } from "../enums/entities.enum";
import { TSelectParams, TWhereParams } from "../types/repository.types";


export default abstract class Repository<TTable extends keyof IDatabase> {

  readonly abstract tableName: TTable;
  readonly abstract softDelete: boolean;
  protected readonly abstract db: Kysely<IDatabase>

  protected qr(tableName: TTable, withTrash: boolean) {
    const { table, ref } = this.db.dynamic;

    let query = this.db
      .selectFrom(table(tableName).as('t'))
      .selectAll();

    if (this.softDelete && !withTrash) {
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
        () => HTTPError.notFound({ message: `${ENTITY_BY_TABLE[this.tableName]} not found`, detail: { path: column, value } })
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
}