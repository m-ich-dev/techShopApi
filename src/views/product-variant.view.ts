import { IRecordAttribute } from "../records/attribute.record";
import { IRecordPrice } from "../records/price.record";
import { IRecordProductAttribute } from "../records/product-attribute.record";
import { IRecordProductVariant, TPivotRecordProductVariant } from "../records/product-variant.record";

type TVariantAttribute = {
    attributeId: IRecordAttribute['id'];
    attributeTitle: IRecordAttribute['title'];
    attributeValue: IRecordProductAttribute['value'];
}
type TVariantPrice = {
    id: IRecordProductVariant['currentPriceId'];
    price: IRecordPrice['price'];
    oldPrice: IRecordPrice['oldPrice'];
    discount: IRecordPrice['discount'];
};
type TProductVariant = Omit<IRecordProductVariant, 'currentPriceId'> & {
    prices: TVariantPrice;
    attributes: TVariantAttribute[]
};
export type TProductVariantRow = Omit<TPivotRecordProductVariant, 'attributes'> & {
    attributes: TVariantAttribute[];
};

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