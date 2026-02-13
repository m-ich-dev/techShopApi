import Resource from "../../boot/http/resource";
import { TCategory } from "../../views/category.view";

type TCategoryResource = Omit<TCategory, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export default class CategoryResource extends Resource {
    public static override transform(data: TCategory): TCategoryResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };
    }
}
