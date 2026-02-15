import { Knex } from "knex";
import { brandSeedData } from "./data/brand.seed.data";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Deletes ALL existing entries
    await knex("brands").truncate();

    // Inserts seed entries
    await knex("brands").insert(brandSeedData);

    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
