import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('attributes', function (table) {
        table.collate('utf8mb4_unicode_ci');

        table.increments('id');
        table.string('title');
        table.string('slug').unique();
        table.string('filter_type');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        table.index(['deleted_at']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('attributes');
}

