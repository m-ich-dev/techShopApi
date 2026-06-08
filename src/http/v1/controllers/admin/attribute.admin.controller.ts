import Controller from "@/boot/http/controller.js";
import type AttributeService from "@/services/attribute.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";


export default class AttributeAdminController extends Controller {
    constructor(private readonly attributeService: AttributeService) { super(); }

    public index: THttp = async (req, res) => {
        const attributes = await this.attributeService.all();
        return this.resOk(res, { data: attributes });
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