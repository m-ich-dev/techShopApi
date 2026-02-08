export interface IRecordCategory {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertCategory = Pick<IRecordCategory, 'title' | 'slug'>;
export type TUpdateCategory = Partial<TInsertCategory>;