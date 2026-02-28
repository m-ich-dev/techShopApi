import { Kysely, sql } from "kysely";
import { updatedAtTrigger } from "./triggers/updated-at.trigger";

const tableName = 'prices';

export async function up(db: Kysely<any>): Promise<void> {
    db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())

        .addColumn('product_variant_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('product_variant_id_foreign', ['product_variant_id'], 'product_variants', ['id'])

        .addColumn('price', 'decimal', (col) => col.defaultTo(0).notNull())
        .addColumn('old_price', 'decimal', (col) => col.defaultTo(0).notNull())
        .addColumn('discount', 'integer', (col) => col.defaultTo(0).notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('deleted_at', 'timestamptz')
        .execute();

    await db.schema
        .createIndex(`idx_${tableName}_deleted_at`)
        .on(tableName)
        .column('deleted_at')
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropIndex(`idx_${tableName}_deleted_at`).ifExists().execute();
    await db.schema.dropTable(tableName).ifExists().execute();
}

