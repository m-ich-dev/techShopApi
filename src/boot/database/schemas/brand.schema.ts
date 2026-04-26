import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import type { Requestable } from "@/boot/types/db.types.js";


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