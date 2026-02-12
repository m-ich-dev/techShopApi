import { TInsertRecord } from "../boot/types/db.types";

export interface IRecordAttribute {
    id: number;
    title: string;
    slug: string;
    filterType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertAttribute = TInsertRecord<IRecordAttribute>;
export type TUpdateAttribute = Partial<TInsertAttribute>;
