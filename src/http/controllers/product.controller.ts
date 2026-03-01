import { HTTP_CODES } from "../../boot/enums/http.enum";
import Controller from "../../boot/http/controller";
import { THttp, THttpLocals } from "../../boot/types/http.types";
import MasterProductService from "../../services/master-product.service";
import ProductService from "../../services/product.service";


export default class ProductController extends Controller {
    constructor(
        private readonly productService: ProductService,
        private readonly masterProductService: MasterProductService
    ) { super(); }

    public index: THttp = async (req, res) => {
        const products = await this.masterProductService.all();
        return res.status(HTTP_CODES.OK).json({ data: products });
    };

    public show: THttpLocals<{ slug: string }> = async (req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.showPivotBySlug(slug);
        return res.status(HTTP_CODES.OK).json({ data: product });
    };
}