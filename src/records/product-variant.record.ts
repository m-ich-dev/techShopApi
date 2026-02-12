import { TInsert } from "../boot/database/record.types";

export interface IRecordProductVariant {
    id: number;
    parentId: number;
    currentPriceId: number;
    sku: string;
    stock: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null
};

export type TInsertProductVariant = TInsert<IRecordProductVariant>;
export type TUpdateProductVariant = Partial<TInsertProductVariant>;

export type TPivotRecordProductVariant = IRecordProductVariant & {
    price: number;
    oldPrice: number;
    discount: number;
    attributes: string | null;
}