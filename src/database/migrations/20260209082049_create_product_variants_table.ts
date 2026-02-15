import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_variants', function (table) {
        table.collate('utf8mb4_unicode_ci');

        table.increments('id');
        table.integer('parent_id').notNullable().unsigned().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('current_price_id').nullable().unsigned().references('id').inTable('prices').onUpdate('CASCADE').onDelete('RESTRICT');

        table.string('title').notNullable();
        table.integer('stock').defaultTo(0);
        table.string('slug').unique();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        table.index(['deleted_at']);

    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product_variants');
}

