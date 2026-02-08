import { IRecordAttribute } from "../records/attribute.record";
import { IRecordBrand } from "../records/brand.record";
import { IRecordCategory } from "../records/category.record";
import { IRecordPrice } from "../records/price.record";
import { IRecordProductAttribute } from "../records/product-attribute.record";
import { IRecordProduct } from "../records/product.record";

type TProductAttribute = {
    attributeId: IRecordAttribute['id'];
    attributeTitle: IRecordAttribute['title'];
    attributeValue: IRecordProductAttribute['value'];
}
type TProductPrice = {
    priceId: IRecordPrice['id'];
    price: IRecordPrice['price'];
    oldPrice: IRecordPrice['oldPrice'];
    discount: IRecordPrice['discount'];
};
type TProductCategory = {
    categoryId: IRecordCategory['id'];
    categoryTitle: IRecordCategory['title']
}
type TProductBrand = {
    brandId: IRecordBrand['id'];
    brandTitle: IRecordBrand['title'];
}
type TProduct = Omit<IRecordProduct, 'categoryId' | 'brandId'> & {
    category: TProductCategory;
    brand: TProductBrand;
    prices: TProductPrice;
    attributes: TProductAttribute[];
};

type TProductConstructor = Omit<IRecordProduct, 'categoryId' | 'brandId'> & {
    attributes: TProductAttribute[] | string;
} & TProductCategory & TProductBrand & TProductPrice;

export default class Product implements TProduct {
    id: number;
    category: TProductCategory;
    brand: TProductBrand;
    title: string;
    sku: string;
    stock: number;
    slug: string;
    prices: TProductPrice;
    attributes: TProductAttribute[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;


    constructor(data: TProductConstructor) {

        if (typeof data.attributes === 'string') {
            data.attributes = JSON.parse(data.attributes) as TProduct['attributes'] || [];
        }

        this.id = data.id;
        this.category = {
            categoryId: data.categoryId,
            categoryTitle: data.categoryTitle
        };
        this.brand = {
            brandId: data.brandId,
            brandTitle: data.brandTitle
        };
        this.title = data.title;
        this.sku = data.sku;
        this.stock = data.stock;
        this.slug = data.slug;
        this.prices = {
            priceId: data.priceId,
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