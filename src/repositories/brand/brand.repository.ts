import { Kysely } from "kysely";
import Repositorty from "../../boot/repositories/repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";

export default class BrandRepository extends Repositorty<'brands'> {
    public readonly tableName: "brands" = 'brands';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

}