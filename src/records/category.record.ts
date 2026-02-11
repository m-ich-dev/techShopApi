import { TInsert } from "../boot/database/record.types";

export interface IRecordCategory {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertCategory = TInsert<IRecordCategory>;
export type TUpdateCategory = Partial<TInsertCategory>;