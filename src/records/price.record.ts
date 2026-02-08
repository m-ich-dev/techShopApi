export interface IRecordPrice {
    id: number;
    productId: number;
    price: number;
    oldPrice: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TInsertPrice = Omit<IRecordPrice, 'id'>;
export type TUpdatePrice = Partial<TInsertPrice>;