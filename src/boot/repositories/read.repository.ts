import { Kysely, SelectType } from "kysely";
import { IDatabase } from "../database/schemas/index.schema";
import HTTPError from "../http/http.error";
import { ENTITY_BY_TABLE } from "../enums/entities.enum";
import { TSelectType, TWhereType } from "../types/db.types";


export default abstract class ReadRepository<TTable extends keyof IDatabase> {

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
      TWhereType<TTable, Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(tableName, withTrash);

    return await qr
      .where(ref(`t${column}`), '=', value)
      .orderBy('t.id')
      .executeTakeFirstOrThrow(() => HTTPError.notFound(`${ENTITY_BY_TABLE[this.tableName]} with ${column}: ${value} not found`));
  }

  public async get<
    Column extends keyof IDatabase[TTable] & string,
    Value extends SelectType<IDatabase[TTable][Column]>,
  >(
    { tableName = this.tableName, column, value, withTrash = false }:
      TWhereType<TTable, Column, Value>
  ) {

    const { ref } = this.db.dynamic;

    const qr = this.qr(tableName, withTrash);
    return await qr
      .where(ref(`t${column}`), '=', value)
      .orderBy('t.id')
      .execute();
  }

  public async all(
    { tableName = this.tableName, withTrash = false }:
      TSelectType<TTable>
  ) {
    return await this.qr(tableName, withTrash).execute();
  }

}