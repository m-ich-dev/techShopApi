import { Kysely } from "kysely";
import Repositorty from "../../boot/repositories/repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import { Sluggable } from "../../boot/mixins/repository/sluggable-repository.mixin";

export default class BrandRepository extends Sluggable(Repositorty<'brands'>) {
    public readonly tableName: "brands" = 'brands';
    public readonly softDeletable = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

}