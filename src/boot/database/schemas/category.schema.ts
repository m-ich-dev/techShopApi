import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ICategoryTable {
    id: Generated<number>;
    title: string;
    slug: string;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordCategory = Selectable<ICategoryTable>;
export type TInsertCategory = Insertable<ICategoryTable>;
export type TUpdateCategory = Updateable<ICategoryTable>;