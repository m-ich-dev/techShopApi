import { IRecordAttribute } from "../../records/attribute.record";
import { IRecordPrice } from "../../records/price.record";
import { IRecordProductAttribute } from "../../records/product-attribute.record";
import { IRecordProductVariant, TPivotRecordProductVariant } from "../../records/product-variant.record";


export type TVariantAttribute = {
    attributeId: IRecordAttribute['id'];
    attributeTitle: IRecordAttribute['title'];
    attributeValue: IRecordProductAttribute['value'];
}
export type TVariantPrice = {
    id: IRecordProductVariant['currentPriceId'];
    price: IRecordPrice['price'];
    oldPrice: IRecordPrice['oldPrice'];
    discount: IRecordPrice['discount'];
};
export type TProductVariant = Omit<IRecordProductVariant, 'currentPriceId'> & {
    prices: TVariantPrice;
    attributes: TVariantAttribute[]
};
export type TProductVariantRow = Omit<TPivotRecordProductVariant, 'attributes'> & {
    attributes: TVariantAttribute[];
};
