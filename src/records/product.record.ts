import { TInsertRecord } from "../boot/types/db.types";

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

export type TInsertProduct = TInsertRecord<IRecordProduct>;
export type TUpdateProduct = Partial<TInsertProduct>;

export type TPivotRecordProduct = IRecordProduct & {
    categoryTitle: string;
    brandTitle: string;
}