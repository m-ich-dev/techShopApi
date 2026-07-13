import Controller from "@/boot/http/controller.js";
import type AttributeService from "@/services/attribute.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class AttributeAdminController extends Controller {
    constructor(private readonly attributeService: AttributeService) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {

        const {
            page,
            limit
        } = res.locals.reqQuery;

        const { data, meta } = await this.attributeService.all({ page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });
    };

    public store: THttp = async (req, res) => {
        const attributes = await this.attributeService.store(req.body);
        return this.resOk(res, { data: attributes });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const attribute = await this.attributeService.showBySlug(slug);
        return this.resOk(res, { data: attribute });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const attribute = await this.attributeService.update(req.body, slug);
        return this.resOk(res, { data: attribute });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.attributeService.delete(slug);
        return this.resOk(res, { data: result });
    };
}