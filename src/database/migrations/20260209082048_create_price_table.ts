import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('prices', function (table) {
        table.collate('utf8mb4_unicode_ci');
        
        table.increments('id');

        table.decimal('price').unsigned().notNullable().defaultTo(0);
        table.decimal('old_price').unsigned().notNullable().defaultTo(0);
        table.integer('discount').unsigned().notNullable().defaultTo(0);

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        table.index(['deleted_at']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('prices');
}

