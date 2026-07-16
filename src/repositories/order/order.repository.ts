import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class OrderRepository extends Repository<'orders'> {
    public readonly tableName: "orders" = 'orders';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}