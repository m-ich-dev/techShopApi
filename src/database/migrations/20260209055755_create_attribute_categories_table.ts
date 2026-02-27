import { Kysely } from "kysely";

const tableName = 'attribute_categories';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('attribute_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('attribute_id_foreign', ['attribute_id'], 'attributes', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('category_id', 'integer', (col) => col.notNull())
        .addForeignKeyConstraint('category_id_foreign', ['category_id'], 'categories', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addPrimaryKeyConstraint('primary_key', ['category_id', 'attribute_id'])
        .execute();

}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable(tableName).ifExists().execute();

}

