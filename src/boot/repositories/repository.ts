import { db } from "../database/db.knex";

export default abstract class Repository<TRecord extends object> {
    protected readonly abstract tableName: string;
    protected readonly abstract primaryKey: string;
    protected readonly abstract softDelete: boolean;

    public query() {
        const qr = db<TRecord>(this.tableName);
        return this.softDelete ? qr.whereNull(`${this.tableName}.deletedAt`) : qr;
    }
}