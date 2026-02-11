import { IRecordProduct } from "../records/product.record";

export type TProduct = IRecordProduct;
export type TProductConstructor = TProduct

export default class Product implements TProduct {
    id: number;
    categoryId: number;
    brandId: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TProductConstructor) {
        this.id = data.id;
        this.categoryId = data.categoryId;
        this.brandId = data.brandId;
        this.title = data.title;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}