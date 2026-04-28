import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IRefreshTokenTable {
    id: Generated<number>;
    user_id: string;
    token_hash: string;
    created_at: ColumnType<Date, never, never>;
    expires_at: Date;
    revoked_at: Date | null;
    user_agent: string;
    ip: string;
}

export type TRecordRefreshToken = Selectable<IRefreshTokenTable>;
export type TInsertRefreshToken = Insertable<IRefreshTokenTable>;
export type TUpdateRefreshToken = Updateable<IRefreshTokenTable>;