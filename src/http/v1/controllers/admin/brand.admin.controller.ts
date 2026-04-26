import Controller from "@/boot/http/controller.js";
import BrandService from "@/services/brand.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import { HTTP_CODES } from "@/boot/enums/http.enum.js";


export default class BrandAdminController extends Controller {
    constructor(private readonly brandSerivce: BrandService) { super(); }

    public index: THttp = async (req, res) => {
        const brands = await this.brandSerivce.all();
        return res.status(HTTP_CODES.OK).json({ data: brands });
    };
    public store: THttp = async (req, res) => {
        const brand = await this.brandSerivce.store(req.body);
        return res.status(HTTP_CODES.CREATED).json({ data: brand });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: brand });
    };
    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.update(req.body, slug);
        return res.status(HTTP_CODES.OK).json({ data: brand });
    };
    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.brandSerivce.delete(slug);
        return res.status(HTTP_CODES.OK).json({ data: result });
    };
}