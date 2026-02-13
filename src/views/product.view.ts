import { TProduct, TProductBrand, TProductCategory, TProductRow } from "./types/product.types";


export default class Product implements TProduct {
    id: number;
    category: TProductCategory;
    brand: TProductBrand;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TProductRow) {
        this.id = data.id;
        this.category = {
            id: data.categoryId,
            title: data.categoryTitle
        };
        this.brand = {
            id: data.brandId,
            title: data.brandTitle
        };
        this.title = data.title;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}