import { TProductVariant, TProductVariantRow, TVariantAttribute, TVariantPrice } from "./types/product-variant.types";


export default class ProductVariant implements TProductVariant {
    id: number;
    parentId: number;
    sku: string;
    stock: number;
    slug: string;
    prices: TVariantPrice;
    attributes: TVariantAttribute[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TProductVariantRow) {
        this.id = data.id;
        this.parentId = data.parentId;
        this.sku = data.sku;
        this.stock = data.stock;
        this.slug = data.slug;
        this.prices = {
            id: data.currentPriceId,
            price: data.price,
            oldPrice: data.oldPrice,
            discount: data.discount
        };
        this.attributes = data.attributes;

        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}