import Resource from "@/boot/http/resource.js";
import type { TRecordBrand } from "@/boot/database/schemas/brand.schema.js";
import type { TBrandClientResource } from "@/types/resources/brand.resource.types.js";


export default class BrandResource extends Resource {
    public static override transform(data: TRecordBrand): TBrandClientResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };

    }
}