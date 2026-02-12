import { TInsertRecord } from "../boot/types/db.types";


export interface IRecordProductAttribute {
    id: number;
    productId: number;
    attributeId: number;
    value: string;
};

export type TInsertProductAttribute = TInsertRecord<IRecordProductAttribute>;
export type TUpdateProductAttribute = Partial<TInsertProductAttribute>;