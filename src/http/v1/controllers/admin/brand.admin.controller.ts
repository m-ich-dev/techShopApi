import Controller from "../../../../boot/http/controller";
import BrandService from "../../../../services/brand.service";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import { HTTP_CODES } from "../../../../boot/enums/http.enum";


export default class BrandAdminController extends Controller {
    constructor(private readonly brandSerivce: BrandService) { super(); }

    public index: THttp = async (req, res) => {
        const brands = await this.brandSerivce.all();
        return res.status(HTTP_CODES.OK).json({ data: brands });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: brand });
    };
}