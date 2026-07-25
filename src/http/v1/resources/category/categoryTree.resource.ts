import Resource from "@/boot/http/resource.js";
import type { TCategoryBranch } from "@/services/category.service.js";
import type { TCategoryTreeClientResource } from "@/types/resources/categoryTree.resource.types.js";


export default class CategoryTreeResource extends Resource {
    public static override transform(data: TCategoryBranch): TCategoryTreeClientResource {
        return {
            title: data.title,
            slug: data.slug,
            parentId: data.parentId,
            children: this.collection(data.children)
        };
    }
}