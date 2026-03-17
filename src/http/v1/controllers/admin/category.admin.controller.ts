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
    
    public store: THttp = async (req, res) => {
        const category = await this.categoryService.store(req.body);
        return res.status(HTTP_CODES.OK).json({ data: category });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.showBySlug(slug);

        return res.status(HTTP_CODES.OK).json({ data: category });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.update(req.body, slug);
        return res.status(HTTP_CODES.OK).json({ data: category });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.categoryService.delete(slug);
        return res.status(HTTP_CODES.OK).json({ data: result });
    };
}