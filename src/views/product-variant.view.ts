import { TProductVariant, TProductVariantRow, TVariantAttribute, TVariantPrice } from "./types/product-variant.types";


export default class ProductVariant implements TProductVariant {
    id: number;
    parentId: number;
    title: string;
    stock: number;
    slug: string;
    prices: TVariantPrice | null;
    attributes: TVariantAttribute[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TProductVariantRow) {
        this.id = data.id;
        this.parentId = data.parentId;
        this.title = data.title;
        this.stock = data.stock;
        this.slug = data.slug;
        this.prices = data.currentPriceId ? {
            id: data.currentPriceId,
            price: data.price,
            oldPrice: data.oldPrice,
            discount: data.discount
        } : null;
        this.attributes = data.attributes;

        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}