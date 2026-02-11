import { TInsert } from "../boot/database/record.types";

export interface IRecordProductAttribute {
    id: number;
    productId: number;
    attributeId: number;
    value: string;
};

export type TInsertProductAttribute = TInsert<IRecordProductAttribute>;
export type TUpdateProductAttribute = Partial<TInsertProductAttribute>;