import { TInsert } from "../boot/database/record.types";

export interface IRecordBrand {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertBrand = TInsert<IRecordBrand>;
export type TUpdateBrand = Partial<TInsertBrand>;