import { TInsert } from "../boot/database/record.types";

export interface IRecordPrice {
    id: number;
    productVariantId: number;
    price: number;
    oldPrice: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TInsertPrice = TInsert<IRecordPrice>;
export type TUpdatePrice = Partial<TInsertPrice>;