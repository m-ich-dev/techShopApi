export interface IRecordProduct {
    id: number;
    categoryId: number;
    brandId: number;
    title: string;
    sku: string;
    stock: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type TInsertProduct = Omit<IRecordProduct, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type TUpdateProduct = Partial<TInsertProduct>;
