import type { UUID } from "crypto";
import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IRefreshTokenTable {
    id: Generated<number>;
    userId: UUID;
    tokenHash: string;
    createdAt: ColumnType<Date, never, never>;
    expiredAt: Date;
    revokedAt: Date | null;
    userAgent: string | null;
    ip: string | null;
}

export type TRecordRefreshToken = Selectable<IRefreshTokenTable>;
export type TInsertRefreshToken = Insertable<IRefreshTokenTable>;
export type TUpdateRefreshToken = Updateable<IRefreshTokenTable>;