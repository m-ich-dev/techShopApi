import ProductCatalogResource from "@/http/v1/resources/product/product.catalog.resource.js";
import type { TProductShowResource } from "@/types/resources/product.resource.types.js";


type TProductShowInput = {
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
    // Kysely выводит attributes как optional из-за $if, но presence гарантируется вызовом queryWithPivot(_, true)
    attributes?: {
        id: number;
        title: string;
        value: string;
    }[];
};


export default class ProductShowResource extends ProductCatalogResource {
    public static override transform(data: TProductShowInput): TProductShowResource {
        const base = super.transform(data);

        return {
            ...base,
            attributes: (data.attributes ?? []).map(({ title, value }) => ({ title, value }))
        };
    }
}
