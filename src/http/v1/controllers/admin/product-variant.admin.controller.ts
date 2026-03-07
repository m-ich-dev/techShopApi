import { HTTP_CODES } from "../../../../boot/enums/http.enum";
import Controller from "../../../../boot/http/controller";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import ProductVariantService from "../../../../services/product-variant.service";


export default class ProductVariantAdminController extends Controller {
    constructor(private readonly variantService: ProductVariantService) { super(); }

    public index: THttp = async (req, res) => {
        const variants = this.variantService.all();
        return res.status(HTTP_CODES.OK).json({ data: variants });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const variant = this.variantService.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: variant });
    };
}