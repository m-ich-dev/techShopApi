import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IBrandTable {
    id: Generated<number>;
    title: string;
    slug: string;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordBrand = Selectable<IBrandTable>;
export type TInsertBrand = Insertable<IBrandTable>;
export type TUpdateBrand = Updateable<IBrandTable>;