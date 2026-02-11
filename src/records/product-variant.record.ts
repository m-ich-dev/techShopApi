import { TInsert } from "../boot/database/record.types";

export interface IRecordProductVariant {
    id: number;
    parentId: number;
    current_price_id: number;
    sku: string;
    stock: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null
};

export type TInsertProductVariant = TInsert<IRecordProductVariant>;
export type TUpdateProductVariant = Partial<TInsertProductVariant>;