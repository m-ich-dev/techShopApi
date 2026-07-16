import Resource from "@/boot/http/resource.js";
import type { TProductCatalogResource } from "@/types/resources/product.resource.types.js";


type TProductCatalogInput = {
    id: number;
    title: string;
    slug: string;
    stock: number;
    brandTitle: string;
    brandSlug: string;
    categoryTitle: string;
    categorySlug: string;
    price: {
        current: number;
        old: number | null;
    } | null;
};


export default class ProductCatalogResource extends Resource {
    public static discountPercent(current: number, old: number | null): number | null {
        if (old === null || old <= current) return null;
        return Math.round((1 - current / old) * 100);
    }

    public static override transform(data: TProductCatalogInput): TProductCatalogResource {
        const price = data.price === null
            ? null
            : {
                current: data.price.current,
                old: data.price.old,
                discountPercent: this.discountPercent(data.price.current, data.price.old)
            };

        return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            stock: data.stock,
            brand: {
                title: data.brandTitle,
                slug: data.brandSlug
            },
            category: {
                title: data.categoryTitle,
                slug: data.categorySlug
            },
            price
        };
    }
}