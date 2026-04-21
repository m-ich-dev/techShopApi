import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { Requestable } from "../../types/db.types";


export interface IBrandTable {
    id: Generated<number>;
    title: string;
    slug: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;

    deletedAt: Date | null;
}

export type TRecordBrand = Selectable<IBrandTable>;
export type TInsertBrand = Insertable<IBrandTable>;
export type TUpdateBrand = Updateable<IBrandTable>;
export type TRequestBrand = Requestable<TInsertBrand, 'slug'>;