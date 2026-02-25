import Resource from "../../../boot/http/resource";
import { TRecordBrand } from "../../../boot/database/schemas/brand.schema";
import { TBrandClientResource } from "./brand.resource.types";

export default class BrandResource extends Resource {
    public static override transform(data: TRecordBrand): TBrandClientResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };

    }
}