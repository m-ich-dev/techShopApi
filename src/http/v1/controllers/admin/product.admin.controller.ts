import Controller from "@/boot/http/controller.js";
import type ProductService from "@/services/product.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class ProductAdminController extends Controller {
    constructor(
        private readonly productService: ProductService,
    ) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {
        const {
            page,
            limit
        } = res.locals.reqQuery;
        const { data, meta } =
            await this.productService.all({
                page,
                limit,
            });

        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });
    };

    public store: THttp = async (req, res) => {
        const product = await this.productService.store(req.body);
        return this.resOk(res, { data: product });
    };

    public masterStore: THttp = async (req, res) => {
        const result = await this.productService.masterCreate(req.body);
        return this.resOk(res, { data: result });
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