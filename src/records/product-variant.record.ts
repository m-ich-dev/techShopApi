import { TInsertRecord } from "../boot/types/db.types";

export interface IRecordProductVariant {
    id: number;
    parentId: number;
    currentPriceId: number | null;
    title: string
    stock: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null
};

export type TInsertProductVariant = TInsertRecord<IRecordProductVariant>;
export type TUpdateProductVariant = Partial<TInsertProductVariant>;

export type TPivotRecordProductVariant = IRecordProductVariant & {
    price: number;
    oldPrice: number;
    discount: number;
    attributes: string | null;
}