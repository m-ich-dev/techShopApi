import Controller from "../../../../boot/http/controller";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import CategoryService from "../../../../services/category.service";
import { HTTP_CODES } from "../../../../boot/enums/http.enum";


export default class CategoryAdminController extends Controller {
    constructor(private readonly categoryService: CategoryService) { super(); }

    public index: THttp = async (req, res) => {
        const categories = await this.categoryService.all();

        return res.status(HTTP_CODES.OK).json({ data: categories });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.showBySlug(slug);

        return res.status(HTTP_CODES.OK).json({ data: category });
    };
}