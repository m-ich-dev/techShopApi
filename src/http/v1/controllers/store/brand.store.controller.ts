import { HTTP_CODES } from "@/boot/enums/http.enum.js";
import Controller from "@/boot/http/controller.js";
import BrandService from "@/services/brand.service.js";
import BrandResource from "@/http/v1/resources/brand/brand.resource.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";


export default class BrandStoreController extends Controller {
    constructor(private readonly brandService: BrandService) { super(); }

    public index: THttp = async (req, res) => {
        const brands = await this.brandService.all();
        return res.status(HTTP_CODES.OK).json({ data: BrandResource.collection(brands) });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const brand = await this.brandService.showBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: BrandResource.transform(brand) });
    };
}