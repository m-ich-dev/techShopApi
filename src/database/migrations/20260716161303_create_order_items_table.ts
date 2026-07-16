import { Kysely, sql } from "kysely";
import updatedAtTrigger from '../migrations/triggers/updated-at.trigger.js';


const tableName = 'order_items';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())

        .addColumn('order_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('order_id_foreign', ['order_id'], 'orders', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('product_variant_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('product_variant_id_foreign', ['product_variant_id'], 'product_variants', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        // Снапшот названия варианта на момент оформления заказа — сохраняет читаемость истории
        .addColumn('title', 'varchar', (col) => col.notNull())
        .addColumn('quantity', 'integer', (col) => col.notNull())
        // Снапшот цены на момент оформления заказа
        .addColumn('price', 'decimal', (col) => col.notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropTable(tableName).ifExists().execute();
}