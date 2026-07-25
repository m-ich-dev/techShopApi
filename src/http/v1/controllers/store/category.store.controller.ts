import Controller from "@/boot/http/controller.js";
import type { THttp } from "@/boot/types/http.types.js";
import type CategoryService from "@/services/category.service.js";
import CategoryTreeResource from "../../resources/category/categoryTree.resource.js";


export default class CategoryStoreController extends Controller {
    constructor(private readonly categoryService: CategoryService) { super(); }

    public index: THttp = async (req, res) => {
        const categoryTree = await this.categoryService.tree();
        return this.resOk(res, { data: CategoryTreeResource.collection(categoryTree) });
    };
}