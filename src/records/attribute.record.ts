import { TInsert } from "../boot/database/record.types";

export interface IRecordAttribute {
    id: number;
    title: string;
    slug: string;
    filterType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertAttribute = TInsert<IRecordAttribute>;
export type TUpdateAttribute = Partial<TInsertAttribute>;
