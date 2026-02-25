import { HTTP_CODES } from "../../boot/enums/http.enum";
import Controller from "../../boot/http/controller";
import { THttp, THttpLocals } from "../../boot/types/http.types";
import ProductService from "../../services/product.service";


export default class ProductController extends Controller {
    constructor(private readonly productService: ProductService) { super(); }

    public index: THttp = async (req, res) => {
        const products = await this.productService.allMasterProducts();
        return res.status(HTTP_CODES.OK).json({ data: products });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.showMasterProduct(slug);
        return res.status(HTTP_CODES.OK).json({ data: product });
    };
}