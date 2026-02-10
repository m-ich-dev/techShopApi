import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('attribute_categories', function (table) {
        table.collate('utf8mb4_unicode_ci');

        table.integer('attribute_id').unsigned().notNullable()
            .references('id').inTable('attributes').onDelete('CASCADE').onUpdate('CASCADE');

        table.integer('category_id').unsigned().notNullable()
            .references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');

        table.primary(['attribute_id', 'category_id']);

    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('attribute_categories');
}

