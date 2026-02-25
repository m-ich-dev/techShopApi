import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IProductTable {
    id: Generated<number>;
    categoryId: number;
    brandId: number;
    title: string;
    slug: string;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordProduct = Selectable<IProductTable>;
export type TInsertProduct = Insertable<IProductTable>;
export type TUpdateProduct = Updateable<IProductTable>;