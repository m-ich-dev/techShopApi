import Controller from "@/boot/http/controller.js";
import ProductService from "@/services/product.service.js";
import type { THttp, THttpLocals, THttpQuery } from "@/boot/types/http.types.js";
import HTTPError from "@/boot/http/http.error.js";


export default class ProductAdminController extends Controller {
    constructor(
        private readonly productService: ProductService,
    ) { super(); }

    public index: THttpQuery<{ page?: string }> = async (req, res) => {
        const page = Number(req.query.page);
        if (Number.isNaN(page) || page < 1) {
            throw HTTPError.badRequest({
                message: 'Invalid page number',
                detail: { path: 'page', message: page.toString() }
            });
        }
        const { data, meta } = await this.productService.all({ page, limit: 2 });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, { data, links });
    };
    public store: THttp = async (req, res) => {
        const product = await this.productService.store(req.body);
        return this.resOk(res, { data: product });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.show(slug);
        return this.resOk(res, { data: product });
    };
    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.update(req.body, slug);
        return this.resOk(res, { data: product });
    };
    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.productService.delete(slug);
        return this.resOk(res, { data: result });
    };
}