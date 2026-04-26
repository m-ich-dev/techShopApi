import { HTTP_CODES } from "@/boot/enums/http.enum.js";
import Controller from "@/boot/http/controller.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import CategoryService from "@/services/category.service.js";
import CategoryResource from "@/http/v1/resources/category/category.resource.js";


export default class CategoryStoreController extends Controller {
    constructor(private readonly categoryService: CategoryService) { super(); }

    public index: THttp = async (req, res) => {
        const categories = await this.categoryService.all();
        return res.status(HTTP_CODES.OK).json({ data: CategoryResource.collection(categories) });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: CategoryResource.transform(category) });
    };
}