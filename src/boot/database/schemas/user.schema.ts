import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IUserTable {
    id: Generated<number>;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    role: number,
    is_active: boolean;
    created_at: ColumnType<Date, never, never>;
    updated_at: ColumnType<Date, never, never>;
    deleted_at: ColumnType<Date, never, never>;
}

export type TRecordUser = Selectable<IUserTable>;
export type TInsertUser = Insertable<IUserTable>;
export type TUpdateUser = Updateable<IUserTable>;