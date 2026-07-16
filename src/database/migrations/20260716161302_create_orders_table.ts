import { Kysely, sql } from "kysely";
import updatedAtTrigger from '../migrations/triggers/updated-at.trigger.js';


const tableName = 'orders';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())

        .addColumn('user_id', 'uuid', (col) => col.notNull())
        .addForeignKeyConstraint('user_id_foreign', ['user_id'], 'users', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        .addColumn('order_status_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('order_status_id_foreign', ['order_status_id'], 'order_statuses', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        .addColumn('total_price', 'decimal', (col) => col.notNull())
        .addColumn('shipping_address', 'varchar', (col) => col.notNull())
        .addColumn('payment_method', 'varchar', (col) => col.notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropTable(tableName).ifExists().execute();
}