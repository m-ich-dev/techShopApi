export interface IRecordAttribute {
    id: number;
    title: string;
    slug: string;
    filterType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertAttribute = Pick<IRecordAttribute, 'title' | 'slug' | 'filterType'>;
export type TUpdateAttribute = Partial<TInsertAttribute>;
