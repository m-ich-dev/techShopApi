import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IProductVariantTable {
    id: Generated<number>;
    parentId: number;
    currentPriceId: number | null;
    title: string;
    stock: number;
    slug: string;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordProductVariant = Selectable<IProductVariantTable>;
export type TInsertProductVariant = Insertable<IProductVariantTable>;
export type TUpdateProductVariant = Updateable<IProductVariantTable>;