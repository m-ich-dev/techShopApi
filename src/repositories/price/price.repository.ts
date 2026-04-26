import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class PriceRepository extends Repository<'prices'> {
    public readonly softDeletable: boolean = true;
    public readonly tableName: "prices" = 'prices';

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}