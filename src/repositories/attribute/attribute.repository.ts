import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";


export default class AttributeRepository extends SoftDeletable(Sluggable(Repository<'attributes'>)) {
    public readonly tableName: "attributes" = 'attributes';
    public softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}