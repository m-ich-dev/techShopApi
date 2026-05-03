import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import type { UUID } from "crypto";
import type { TRoles } from "@/boot/enums/roles.enum.js";


export interface IUserTable {
    id: Generated<UUID>;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: TRoles,
    isActive: boolean;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
    deletedAt: Date | null;
}

export type TRecordUser = Selectable<IUserTable>;
export type TInsertUser = Insertable<IUserTable>;
export type TUpdateUser = Updateable<IUserTable>;