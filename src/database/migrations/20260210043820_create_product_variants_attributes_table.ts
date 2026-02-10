import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_variant_attributes', function (table) {

        table.increments('id');
        table.integer('product_variant_id').unsigned().notNullable().references('id').inTable('product_variants').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attributes').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('value');

    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product_variant_attributes');
}

