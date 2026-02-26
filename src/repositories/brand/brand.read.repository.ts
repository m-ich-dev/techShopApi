import { Kysely } from "kysely";
import ReadRepositorty from "../../boot/repositories/read.repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";

export default class BrandReadRepository extends ReadRepositorty<'brands'> {
    public readonly tableName: "brands" = 'brands';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

}