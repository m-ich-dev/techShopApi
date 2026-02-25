import Resource from "../../../boot/http/resource";
import { TRecordCategory } from "../../../boot/database/schemas/category.schema";
import { TCategoryClientResource } from "./category.resource.types";


export default class CategoryResource extends Resource {
    public static override transform(data: TRecordCategory): TCategoryClientResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };
    }
}
