import { Kysely } from "kysely";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import ReadRepositorty from "../../boot/repositories/read.repository";


export default class AttributeReadRepository extends ReadRepositorty<'attributes'> {
    public readonly tableName: "attributes" = 'attributes';
    public softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}