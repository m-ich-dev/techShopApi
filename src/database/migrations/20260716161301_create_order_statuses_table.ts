import { Kysely } from "kysely";


const tableName = 'order_statuses';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('title', 'varchar', (col) => col.notNull())
        .addColumn('description', 'varchar')
        .execute();
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable(tableName).ifExists().execute();
}