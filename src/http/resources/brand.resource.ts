import Resource from "../../boot/http/resource";
import { TBrand } from "../../views/brand.view";

type TBrandResource = Omit<TBrand, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export default class BrandResource extends Resource {
    public static override transform(data: TBrand): TBrandResource {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug
        };

    }
}