import { Selectable } from "kysely";
import { IDatabase, TPrimaryKey } from "../database/schemas/index.schema";
import Repository from "./repository";
import HTTPError from "../http/http.error";
import { ENTITY_BY_TABLE } from "../enums/entities.enum";

export default abstract class ReadRepository<TTable extends keyof IDatabase> extends Repository<TTable> {

  public async all() {
    return await this.query().execute();
  }

  public async find<K extends TPrimaryKey<TTable>>(
    key: K,
    param: Selectable<IDatabase[TTable]>[K]
  ) {
    return this.query()

      .where(key as any, '=', param)
      .executeTakeFirstOrThrow(() => HTTPError.notFound(`${ENTITY_BY_TABLE[this.tableName]} with ${key}: ${param} not found`));
  }

}