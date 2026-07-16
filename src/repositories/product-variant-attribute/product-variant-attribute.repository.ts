import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class ProductVariantAttributeRepository extends Repository<'productVariantAttributes'> {
    public readonly softDeletable: boolean = false;
    public readonly tableName: "productVariantAttributes" = 'productVariantAttributes';

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}