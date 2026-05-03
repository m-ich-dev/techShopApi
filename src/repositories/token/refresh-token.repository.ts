import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import type { Kysely } from "kysely";



export default class RefreshTokenRepository extends Repository<'refreshTokens'> {
    public readonly tableName: "refreshTokens" = 'refreshTokens';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

}