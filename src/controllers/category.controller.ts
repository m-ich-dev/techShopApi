import { HTTP_CODES } from "../boot/enums/http.enums";
import Controller from "../boot/http/controller";
import { THttp, THttpLocals } from "../boot/types/http.types";

import CategoryReadRepository from "../repositories/category/category.read.repository";
import CategoryService from "../services/category.service";


export default class CategoryController extends Controller {
    constructor(private readonly categoryService: CategoryService) { super(); }

    public index: THttp = async (req, res) => {
        const categories = await this.categoryService.all();

        return res.status(HTTP_CODES.OK).json({ data: categories });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.show(slug);

        return res.status(HTTP_CODES.OK).json({ data: category });
    };
}

export function createCategoryController() {
    const categoryReadRepository = new CategoryReadRepository();
    const categoryService = new CategoryService(categoryReadRepository);
    return new CategoryController(categoryService);
}