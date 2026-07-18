import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IBookmarkTable {
    id: Generated<number>;
    userId: string;
    productVariantId: number;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
}

export type TRecordBookmark = Selectable<IBookmarkTable>;
export type TInsertBookmark = Insertable<IBookmarkTable>;
export type TUpdateBookmark = Updateable<IBookmarkTable>;