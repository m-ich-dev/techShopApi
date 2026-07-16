import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class CartRepository extends Repository<'cart'> {
    public readonly tableName: "cart" = 'cart';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}