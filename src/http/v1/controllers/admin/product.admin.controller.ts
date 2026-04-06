import { HTTP_CODES } from "../../../../boot/enums/http.enum";
import Controller from "../../../../boot/http/controller";
import { THttp, THttpLocals } from "../../../../boot/types/http.types";
import ProductService from "../../../../services/product.service";


export default class ProductAdminController extends Controller {
    constructor(
        private readonly productService: ProductService,
    ) { super(); }

    public index: THttp = async (req, res) => {
        const products = await this.productService.all();
        return res.status(HTTP_CODES.OK).json({ data: products });
    };
    public store: THttp = async (req, res) => {
        const product = await this.productService.store(req.body);
        return res.status(HTTP_CODES.OK).json({ data: product });
    };
    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.show(slug);
        return res.status(HTTP_CODES.OK).json({ data: product });
    };
    public update: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.update(req.body, slug);
        return res.status(HTTP_CODES.OK).json({ data: product });
    };
    public destroy: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const result = await this.productService.delete(slug);
        return res.status(HTTP_CODES.OK).json({ data: result });
    };
}