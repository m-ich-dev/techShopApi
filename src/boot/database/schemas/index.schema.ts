import type { Insertable, Selectable, Updateable } from "kysely";
import type { ICategoryTable } from "@/boot/database/schemas/category.schema.js";
import type { IBrandTable } from "@/boot/database/schemas/brand.schema.js";
import type { IAttributeTable } from "@/boot/database/schemas/attribute.schema.js";
import type { IPriceTable } from "@/boot/database/schemas/price.schema.js";
import type { IProductTable } from "@/boot/database/schemas/product.schema.js";
import type { IProductVariantTable } from "@/boot/database/schemas/product-variant.schema.js";
import type { IProductVariantAttributeTable } from "@/boot/database/schemas/product-variant-atrribute.schema.js";


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