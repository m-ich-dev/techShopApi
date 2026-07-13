import Controller from "@/boot/http/controller.js";
import type ProductVariantService from "@/services/product-variant.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class ProductVariantAdminController extends Controller {
    constructor(
        private readonly variantService: ProductVariantService
    ) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {
        const {
            page,
            limit
        } = res.locals.reqQuery;

        const { data, meta } = await this.variantService.all({ page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });
    };

    public store: THttp = async (req, res) => {
        const variant = await this.variantService.store(req.body);
        return this.resOk(res, { data: variant });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const variant = await this.variantService.showBySlug(slug);
        return this.resOk(res, { data: variant });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const variant = await this.variantService.update(req.body, slug);
        return this.resOk(res, { data: variant });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.variantService.delete(slug);
        return this.resOk(res, { data: result });
    };
}