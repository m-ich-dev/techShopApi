import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', function (table) {
        table.collate('utf8mb4_unicode_ci');

        table.increments('id');
        table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('RESTRICT').onUpdate('CASCADE');
        table.integer('brand_id').unsigned().notNullable().references('id').inTable('brands').onDelete('RESTRICT').onUpdate('CASCADE');

        table.string('title').notNullable();
        table.string('slug').unique();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        table.index(['deleted_at']);


    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products');
}

