export interface IRecordProductAttribute {
    id: number;
    productId: number;
    attributeId: number;
    value: string;
};

export type TInsertProductAttribute = Omit<IRecordProductAttribute, 'id'>;
export type TUpdateProductAttribute = Partial<TInsertProductAttribute>;