import { Kysely } from "kysely";
import Repositorty from "../../boot/repositories/repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import { Sluggable } from "../../boot/mixins/repository/sluggable-repository.mixin";


export default class CategoryRepository extends Sluggable(Repositorty<'categories'>) {
    public readonly tableName: "categories" = 'categories';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}