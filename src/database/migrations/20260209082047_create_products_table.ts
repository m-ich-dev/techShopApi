import { Kysely, sql } from "kysely";
import { updatedAtTrigger } from "./triggers/updated-at.trigger";

const tableName = 'products';

export async function up(db: Kysely<any>): Promise<void> {
    db.schema.createTable(tableName)
        .addColumn('id', 'serial')

        .addColumn('category_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('category_id_foreign', ['category_id'], 'categories', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        .addColumn('brand_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('brand_id_foreign', ['brand_id'], 'brands', ['id'],
            (col) => col.onDelete('restrict').onUpdate('cascade'))

        .addColumn('title', 'varchar', (col) => col.notNull())
        .addColumn('slug', 'varchar', (col) => col.unique().notNull())

        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn('deleted_at', 'timestamptz')
        .execute();

    await db.schema
        .createIndex(`idx_${tableName}_deleted_at`)
        .on(tableName)
        .column('deleted_at')
        .execute();

    await db.schema
        .createIndex(`idx_${tableName}_slug`)
        .on(tableName)
        .column('slug')
        .execute();

    await updatedAtTrigger.createTrigger(db, tableName);
}


export async function down(db: Kysely<any>): Promise<void> {
    await updatedAtTrigger.dropTrigger(db, tableName);
    await db.schema.dropIndex(`idx_${tableName}_deleted_at`).ifExists().execute();
    await db.schema.dropIndex(`idx_${tableName}_slug`).ifExists().execute();
    await db.schema.dropTable(tableName).ifExists().execute();
}

