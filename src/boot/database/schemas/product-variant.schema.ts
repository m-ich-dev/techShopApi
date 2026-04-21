import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { Requestable } from "../../types/db.types";

export interface IProductVariantTable {
    id: Generated<number>;
    parentId: number;
    currentPriceId: number | null;
    title: string;
    stock: number;
    slug: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;

    deletedAt: Date | null;
}

export type TRecordProductVariant = Selectable<IProductVariantTable>;
export type TInsertProductVariant = Insertable<IProductVariantTable>;
export type TUpdateProductVariant = Updateable<IProductVariantTable>;
export type TRequestProductVariant = Requestable<TInsertProductVariant, 'slug'>;