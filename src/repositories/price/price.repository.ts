import { Kysely } from "kysely";
import Repository from "../../boot/repositories/repository";
import { IDatabase } from "../../boot/database/schemas/index.schema";


export default class PriceRepository extends Repository<'prices'> {
    public readonly softDeletable: boolean = true;
    public readonly tableName: "prices" = 'prices';

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}