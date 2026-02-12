import { TInsertRecord } from "../boot/types/db.types";

export interface IRecordPrice {
    id: number;
    productVariantId: number;
    price: number;
    oldPrice: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TInsertPrice = TInsertRecord<IRecordPrice>;
export type TUpdatePrice = Partial<TInsertPrice>;