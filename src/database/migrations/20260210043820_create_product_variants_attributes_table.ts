import { Kysely } from "kysely";

const tableName = 'product_variant_attributes';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(tableName)
        .addColumn('product_variant_id', 'bigint', (col) => col.notNull())
        .addForeignKeyConstraint('product_variant_id_foreign', ['product_variant_id'], 'product_variants', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('attribute_id', 'bigint', (col) => col.notNull())
        .addForeignKeyConstraint('attribute_id_foreign', ['attribute_id'], 'attributes', ['id'],
            (col) => col.onDelete('cascade').onUpdate('cascade'))

        .addColumn('value', 'varchar', (col) => col.notNull())

        .addPrimaryKeyConstraint('product_variant_attributes_primary', ['attribute_id', 'product_variant_id'])
        .execute();
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable(tableName).ifExists().execute();
}

