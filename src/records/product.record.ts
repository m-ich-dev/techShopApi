import { TInsert } from "../boot/database/record.types";

export interface IRecordProduct {
    id: number;
    categoryId: number;
    brandId: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null
};

export type TInsertProduct = TInsert<IRecordProduct>;
export type TUpdateProduct = Partial<TInsertProduct>;

export type TPivotRecordProduct = IRecordProduct & {
    categoryTitle: string;
    brandTitle: string;
}