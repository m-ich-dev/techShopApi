export interface IRecordBrand {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertBrand = Pick<IRecordBrand, 'title' | 'slug'>;
export type TUpdateBrand = Partial<TInsertBrand>;