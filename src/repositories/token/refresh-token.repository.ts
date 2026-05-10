import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import type { Kysely } from "kysely";


export default class RefreshTokenRepository extends Repository<'refreshTokens'> {
    public readonly tableName: "refreshTokens" = 'refreshTokens';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    protected override qr(withRevoked?: boolean) {
        const { table } = this.db.dynamic;
        return this.db.selectFrom(table(this.tableName).as('t'))
            .selectAll()
            .$if(!withRevoked, (qb) => qb.where('t.revokedAt', 'is', null));
    }

    public async firstByHash({ tokenHash, withRevoked = false }: { tokenHash: string, withRevoked?: boolean }) {
        return await this.qr(withRevoked)
            .where('t.tokenHash', '=', tokenHash)
            .executeTakeFirst();
    }

    public async revoke({ tokenId }: { tokenId: number }) {
        return await this.db.updateTable(this.tableName)
            .set('revokedAt', new Date())
            .where('id', '=', tokenId)
            .returningAll()
            .executeTakeFirst();
    }

    public async revokeAllByUser({ userId }: { userId: string }) {
        return await this.db.updateTable(this.tableName)
            .set('revokedAt', new Date())
            .where('userId', '=', userId)
            
            .returningAll()
            .execute();
    }
}