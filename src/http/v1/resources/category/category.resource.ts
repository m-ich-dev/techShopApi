import Resource from "@/boot/http/resource.js";
import type { TRecordCategory } from "@/boot/database/schemas/category.schema.js";
import type { TCategoryClientResource } from "@/types/resources/category.resource.types.js";


export default class CategoryResource extends Resource {
    public static override transform(data: TRecordCategory): TCategoryClientResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };
    }
}
