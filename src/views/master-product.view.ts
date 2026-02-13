import { IRecordBrand } from "../records/brand.record";
import { IRecordCategory } from "../records/category.record";
import ProductVariant from "./product-variant.view";
import { TMasterProduct } from "./types/master-product.types";
import { TProductVariant, TProductVariantRow } from "./types/product-variant.types";
import { TProductRow } from "./types/product.types";




export default class MasterProduct implements TMasterProduct {
    id: number;
    category: { id: IRecordCategory["id"]; title: IRecordCategory["title"]; };
    brand: { id: IRecordBrand["id"]; title: IRecordBrand["title"]; };
    title: string;
    slug: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    variants: TProductVariant[];

    constructor(data: { product: TProductRow, variants: TProductVariantRow[] }) {
        this.id = data.product.id;
        this.title = data.product.title;
        this.category = { id: data.product.categoryId, title: data.product.categoryTitle };
        this.brand = { id: data.product.brandId, title: data.product.brandTitle };
        this.slug = data.product.slug;
        this.createdAt = data.product.createdAt;
        this.updatedAt = data.product.updatedAt;
        this.deletedAt = data.product.deletedAt;

        this.variants = data.variants.map(variant => new ProductVariant(variant));
    }
}