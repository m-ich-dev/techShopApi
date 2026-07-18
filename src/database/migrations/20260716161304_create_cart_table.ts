import { Kysely, sql } from "kysely";
import updatedAtTrigger from '../migrations/triggers/updated-at.trigger.js';


const tableName = 'cart';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())

        .addColumn('user_id', 'uuid', (col) => col.notNull())
        .addForeignKeyConstraint('user_id_foreign', ['user_id'], 'users', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('product_variant_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('product_variant_id_foreign', ['product_variant_id'], 'product_variants', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('quantity', 'integer', (col) => col.notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    // Предотвращает дублирование строк для одного варианта в корзине пользователя
    await db.schema.createIndex(`idx_${tableName}_user_id_product_variant_id`)
        .on(tableName)
        .columns(['user_id', 'product_variant_id'])
        .unique()
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropIndex(`idx_${tableName}_user_id_product_variant_id`).ifExists().execute();
    await db.schema.dropTable(tableName).ifExists().execute();
}