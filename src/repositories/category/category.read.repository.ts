import { Kysely } from "kysely";
import ReadRepositorty from "../../boot/repositories/read.repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";


export default class CategoryReadRepository extends ReadRepositorty<'categories'> {
    public readonly tableName: "categories" = 'categories';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}