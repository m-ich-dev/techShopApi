import { Kysely, sql } from "kysely";
import { updatedAtTrigger } from "./triggers/updated-at.trigger";

const tableName = 'product_variants';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('id', 'serial', (col) => col.primaryKey())

        .addColumn('parent_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('parent_id_foreign', ['parent_id'], 'products', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        .addColumn('current_price_id', 'integer')
        .addColumn('title', 'varchar', (col) => col.notNull())
        .addColumn('stock', 'integer', (col) => col.defaultTo(0).notNull())
        .addColumn('slug', 'varchar', (col) => col.unique().notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('deleted_at', 'timestamptz')
        .execute();

    await db.schema.createIndex(`idx_${tableName}_deleted_at`)
        .on(tableName)
        .column('deleted_at')
        .execute();

    await db.schema
        .createIndex(`idx_${tableName}_slug`)
        .on(tableName)
        .column('slug')
        .unique()
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropIndex(`idx_${tableName}_deleted_at`).ifExists().execute();
    await db.schema.dropIndex(`idx_${tableName}_slug`).ifExists().execute();
    await db.schema.dropTable(tableName).ifExists().execute();
}

