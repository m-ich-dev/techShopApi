import * as attributeSchema from "./attribute.schema";
import * as brandSchema from "./brand.schema";
import * as categorySchema from "./category.schema";
import * as priceSchema from "./price.schema";
import * as productSchema from "./product.schema";
import * as productVariantSchema from "./product-variant.schema";
import * as productVariantAttributeSchema from "./product-variant-atrribute.schema";
import { Insertable, Selectable, Updateable } from "kysely";


export interface IDatabase {
    categories: categorySchema.ICategoryTable;
    brands: brandSchema.IBrandTable;
    attributes: attributeSchema.IAttributeTable;
    prices: priceSchema.IPriceTable;
    products: productSchema.IProductTable;
    productVariants: productVariantSchema.IProductVariantTable;
    productVariantAttributes: productVariantAttributeSchema.IProductVariantAttributeTable;
}

export type PK = 'id' | 'slug';
export type TPrimaryKey<T extends keyof IDatabase> =
    Extract<keyof Selectable<IDatabase[T]>, PK>;

export type TSelectable = {
    [K in keyof IDatabase]: Selectable<IDatabase[K]>
};
export type TInsertable = {
    [K in keyof IDatabase]: Insertable<IDatabase[K]>
};
export type TUpdateable = {
    [K in keyof IDatabase]: Updateable<IDatabase[K]>
};