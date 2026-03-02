import { Kysely } from "kysely";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import Repositorty from "../../boot/repositories/repository";


export default class AttributeRepository extends Repositorty<'attributes'> {
    public readonly tableName: "attributes" = 'attributes';
    public softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}