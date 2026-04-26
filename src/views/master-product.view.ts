import type { TMasterProductView } from "@/types/views/master-product.type.js";
import type { TVariantPivot, TVariantView } from "@/types/views/product-variant.type.js";
import type { TProductPivot } from "@/types/views/product.type.js";


export default class MasterProduct implements TMasterProductView {
    id: number;
    category: { id: number; title: string };
    brand: { id: number; title: string };
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    variants: TVariantView[];

    constructor(data: { product: TProductPivot, variants: TVariantPivot[] }) {
        this.id = data.product.id;
        this.title = data.product.title;
        this.category = { id: data.product.categoryId, title: data.product.categoryTitle };
        this.brand = { id: data.product.brandId, title: data.product.brandTitle };
        this.slug = data.product.slug;
        this.createdAt = data.product.createdAt;
        this.updatedAt = data.product.updatedAt;
        this.deletedAt = data.product.deletedAt;
        this.variants = data.variants.map(v => {

            const price = v.price
                ? {
                    id: v.price.id,
                    current: v.price.current,
                    old: v.price.old,
                    discount: v.price.old
                        ? Math.round((1 - v.price.current / v.price.old) * 100)
                        : null
                }
                : null;

            return {
                id: v.id,
                parentId: v.parentId,
                title: v.title,
                slug: v.slug,
                stock: v.stock,
                createdAt: v.createdAt,
                updatedAt: v.updatedAt,
                deletedAt: v.deletedAt,

                price,
                attributes: v.attributes
            };
        });
    }
}