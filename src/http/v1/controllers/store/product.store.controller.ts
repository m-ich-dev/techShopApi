import Controller from "@/boot/http/controller.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import type ProductService from "@/services/product.service.js";
import type { TCatalogQuery } from "../../request-queries/catalog/catalog.query.js";


export default class ProductStoreController extends Controller {
    constructor(private readonly productService: ProductService) { super(); }

    public index: THttpLocals<{ reqQuery: TCatalogQuery }> = async (req, res) => {
        const {
            page,
            brand,
            category,
            minPrice,
            maxPrice,
            ...params
        } = res.locals.reqQuery;

        const attributes = this.parseQueryParams(params);
        const { data, meta } =
            await this.productService.catalog({
                page,
                limit: 6,
                filters: {
                    brand,
                    category,
                    minPrice,
                    maxPrice,
                    attributes
                }
            });

        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data,
            links
        });
    };
}