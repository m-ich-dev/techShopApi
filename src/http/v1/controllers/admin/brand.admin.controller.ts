import Controller from "@/boot/http/controller.js";
import type BrandService from "@/services/brand.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class BrandAdminController extends Controller {
    constructor(private readonly brandSerivce: BrandService) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {

        const {
            page,
            limit
        } = res.locals.reqQuery;

        const { data, meta } = await this.brandSerivce.all({ page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });

    };

    public store: THttp = async (req, res) => {
        const brand = await this.brandSerivce.store(req.body);
        return this.resOk(res, { data: brand });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.showBySlug(slug);
        return this.resOk(res, { data: brand });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.update(req.body, slug);
        return this.resOk(res, { data: brand });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.brandSerivce.delete(slug);
        return this.resOk(res, { data: result });
    };
}