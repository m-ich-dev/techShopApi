import { HTTP_CODES } from "../../../../boot/enums/http.enum";
import Controller from "../../../../boot/http/controller";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import ProductVariantService from "../../../../services/product-variant.service";


export default class ProductVariantAdminController extends Controller {
    constructor(
        private readonly variantService: ProductVariantService
    ) { super(); }

    public index: THttp = async (req, res) => {
        const variants = await this.variantService.all();
        return res.status(HTTP_CODES.OK).json({ data: variants });
    };

    public store: THttp = async (req, res) => {
        const variant = await this.variantService.store(req.body);
        return res.status(HTTP_CODES.OK).json({ data: variant });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const variant = await this.variantService.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: variant });
    };

    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const variant = await this.variantService.update(req.body, slug);
        return res.status(HTTP_CODES.OK).json({ data: variant });
    };

    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.variantService.delete(slug);
        return res.status(HTTP_CODES.OK).json({ data: result });
    };
}