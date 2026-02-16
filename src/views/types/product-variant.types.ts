import { IRecordAttribute } from "../../records/attribute.record";
import { IRecordPrice } from "../../records/price.record";
import { IRecordProductAttribute } from "../../records/product-attribute.record";
import { IRecordProductVariant, TPivotRecordProductVariant } from "../../records/product-variant.record";


export type TVariantAttribute = {
    id: IRecordAttribute['id'];
    title: IRecordAttribute['title'];
    value: IRecordProductAttribute['value'];
}
export type TVariantPrice = {
    id: IRecordPrice['id'];
    price: IRecordPrice['price'];
    oldPrice: IRecordPrice['oldPrice'];
    discount: IRecordPrice['discount'];
};
export type TProductVariant = Omit<IRecordProductVariant, 'currentPriceId'> & {
    prices: TVariantPrice | null;
    attributes: TVariantAttribute[]
};
export type TProductVariantRow = Omit<TPivotRecordProductVariant, 'attributes'> & {
    attributes: TVariantAttribute[];
};
