import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { Requestable } from "../../types/db.types";

export interface ICategoryTable {
    id: Generated<number>;
    title: string;
    slug: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;

    deletedAt: Date | null;
}

export type TRecordCategory = Selectable<ICategoryTable>;
export type TInsertCategory = Insertable<ICategoryTable>;
export type TUpdateCategory = Updateable<ICategoryTable>;
export type TRequestCategory = Requestable<TInsertCategory, 'slug'>;