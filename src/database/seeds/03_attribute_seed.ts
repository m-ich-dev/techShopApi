import { Knex } from "knex";
import { attributeSeedData } from "./data/attribute.seed.data";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Deletes ALL existing entries
    await knex("attributes").truncate();

    // Inserts seed entries
    await knex("attributes").insert(attributeSeedData);

    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

};
