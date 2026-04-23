import { Insertable, Selectable, Updateable } from "kysely";
import { ICategoryTable } from "./category.schema";
import { IBrandTable } from "./brand.schema";
import { IAttributeTable } from "./attribute.schema";
import { IPriceTable } from "./price.schema";
import { IProductTable } from "./product.schema";
import { IProductVariantTable } from "./product-variant.schema";
import { IProductVariantAttributeTable } from "./product-variant-atrribute.schema";


export interface IDatabase {
    categories: ICategoryTable;
    brands: IBrandTable;
    attributes: IAttributeTable;
    prices: IPriceTable;
    products: IProductTable;
    productVariants: IProductVariantTable;
    productVariantAttributes: IProductVariantAttributeTable;
}

export type TSelectable = {
    [K in keyof IDatabase]: Selectable<IDatabase[K]>
};
export type TInsertable = {
    [K in keyof IDatabase]: Insertable<IDatabase[K]>
};
export type TUpdateable = {
    [K in keyof IDatabase]: Updateable<IDatabase[K]>
};
export type TSluggable = {
    [K in keyof IDatabase as 'slug' extends keyof IDatabase[K] ? K : never]: IDatabase[K]
};
export type TSoftDeletable = {
    [K in keyof IDatabase as 'deletedAt' extends keyof IDatabase[K] ? K : never]: IDatabase[K]
};