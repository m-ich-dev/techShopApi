import { SelectQueryBuilder } from "kysely";
import db from "../database/db.kysely";
import { IDatabase, TSelectable } from "../database/schemas/index.schema";

export default abstract class Repository<TTable extends keyof IDatabase> {
  readonly abstract tableName: TTable;
  protected readonly db = db;


  protected abstract query(): SelectQueryBuilder<IDatabase, TTable, TSelectable[TTable]>;

}

