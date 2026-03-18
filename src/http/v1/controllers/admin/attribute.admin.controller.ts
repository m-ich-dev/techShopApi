import { HTTP_CODES } from "../../../../boot/enums/http.enum";
import Controller from "../../../../boot/http/controller";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import AttributeService from "../../../../services/attribute.service";


export default class AttributeAdminController extends Controller {
    constructor(private readonly attributeService: AttributeService) { super(); }

    public index: THttp = async (req, res) => {
        const attributes = await this.attributeService.all();
        return res.status(HTTP_CODES.OK).json({ data: attributes });
    };
    public store: THttp = async (req, res) => {
        const attributes = await this.attributeService.store(req.body);
        return res.status(HTTP_CODES.OK).json({ data: attributes });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const attribute = await this.attributeService.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: attribute });
    };
    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const attribute = await this.attributeService.update(req.body, slug);
        return res.status(HTTP_CODES.OK).json({ data: attribute });
    };
    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.attributeService.delete(slug);
        return res.status(HTTP_CODES.OK).json({ data: result });
    };
}