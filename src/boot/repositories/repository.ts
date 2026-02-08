import { db } from "../database/db.knex";

export default abstract class Repository<TRecord extends object> {
    protected abstract tableName: string;
    protected abstract primaryKey: string;
    protected abstract softDelete: boolean;

    public query() {
        const qr = db<TRecord>(this.tableName);
        return this.softDelete ? qr.whereNull(`${this.tableName}.deletedAt`) : qr;
    }
}