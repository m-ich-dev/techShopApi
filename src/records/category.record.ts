import { TInsertRecord } from "../boot/types/db.types";

export interface IRecordCategory {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertCategory = TInsertRecord<IRecordCategory>;
export type TUpdateCategory = Partial<TInsertCategory>;