import Repository from "./repository";

export default abstract class ReadRepositorty<TRecord extends object> extends Repository<TRecord> {

    public async all() {
        return await this.query();
    }

    public async find(param: string | number) {
        return await this.query().where(`${this.tableName}.${this.primaryKey}`, param).first();
    }
}