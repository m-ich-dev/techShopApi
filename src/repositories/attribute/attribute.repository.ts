import { Kysely } from "kysely";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import Repositorty from "../../boot/repositories/repository";
import { Sluggable } from "../../boot/mixins/repository/sluggable.repository.mixin";
import { SoftDeletable } from "../../boot/mixins/repository/soft-deletable.repository.mixin";


export default class AttributeRepository extends SoftDeletable(Sluggable(Repositorty<'attributes'>)) {
    public readonly tableName: "attributes" = 'attributes';
    public softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}