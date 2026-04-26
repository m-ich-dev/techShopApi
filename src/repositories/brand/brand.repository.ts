import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";


export default class BrandRepository extends SoftDeletable(Sluggable(Repository<'brands'>)) {
    public readonly tableName: "brands" = 'brands';
    public readonly softDeletable = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

}