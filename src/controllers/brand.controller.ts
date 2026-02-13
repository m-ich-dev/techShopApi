import { HTTP_CODES } from "../boot/enums/http.enums";
import Controller from "../boot/http/controller";
import { THttp, THttpLocals } from "../boot/types/http.types";
import { BrandService } from "../services/brand.service";


export default class BrandController extends Controller {
    constructor(private readonly brandSerivce: BrandService) { super(); }

    public index: THttp = async (req, res) => {
        const brands = await this.brandSerivce.all();
        return res.status(HTTP_CODES.OK).json({ data: brands });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandSerivce.show(slug);
        return res.status(HTTP_CODES.OK).json({ data: brand });
    };
}