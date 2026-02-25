import { Knex } from "knex";
import Repository from "./repository";
import { Tables } from "knex/types/tables";


export default abstract class WriteRepository<TName extends keyof Tables>
    extends Repository<TName> {

    protected abstract readonly tableName: TName;
    
    public async create(data: Knex.ResolveTableType<Tables[TName], 'insert'>) {
        await this.baseQuery().insert(data as any);
    }
}