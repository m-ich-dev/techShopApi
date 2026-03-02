import { Kysely } from "kysely";
import Repositorty from "../../boot/repositories/repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";


export default class CategoryRepository extends Repositorty<'categories'> {
    public readonly tableName: "categories" = 'categories';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}