import { TInsertRecord } from "../boot/types/db.types";


export interface IRecordBrand {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertBrand = TInsertRecord<IRecordBrand>;
export type TUpdateBrand = Partial<TInsertBrand>;