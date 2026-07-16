import Controller from "@/boot/http/controller.js";
import type CategoryService from "@/services/category.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class CategoryAdminController extends Controller {
    constructor(private readonly categoryService: CategoryService) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {

        const {
            page,
            limit
        } = res.locals.reqQuery;

        const { data, meta } = await this.categoryService.all({ page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });
    };

    public store: THttp = async (req, res) => {
        const category = await this.categoryService.store(req.body);
        return this.resOk(res, { data: category });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.showBySlug(slug);
        return this.resOk(res, { data: category });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const category = await this.categoryService.update(req.body, slug);
        return this.resOk(res, { data: category });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.categoryService.delete(slug);
        return this.resOk(res, { data: result });
    };
}