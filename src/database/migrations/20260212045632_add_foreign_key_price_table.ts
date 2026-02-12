import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('prices', function (table) {
        table.integer('product_variant_id').unsigned().notNullable().references('id').inTable('product_variants')
            .onDelete('CASCADE').onUpdate('CASCADE').after('id');

    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('prices', function (table) {
        table.dropForeign('product_variant_id');
    });
}

