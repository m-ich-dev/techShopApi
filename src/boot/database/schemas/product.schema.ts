import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import type { Requestable } from "@/boot/types/db.types.js";


export interface IProductTable {
    id: Generated<number>;
    categoryId: number;
    brandId: number;
    title: string;
    slug: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;

    deletedAt: Date | null;
}

export type TRecordProduct = Selectable<IProductTable>;
export type TInsertProduct = Insertable<IProductTable>;
export type TUpdateProduct = Updateable<IProductTable>;
export type TRequestProduct = Requestable<TInsertProduct, 'slug'>