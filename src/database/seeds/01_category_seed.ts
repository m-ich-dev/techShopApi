import { Knex } from "knex";
import { categorySeedData } from "./data/category.seed.data";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Deletes ALL existing entries
    await knex("categories").truncate();

    // Inserts seed entries
    await knex("categories").insert(categorySeedData);

    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
