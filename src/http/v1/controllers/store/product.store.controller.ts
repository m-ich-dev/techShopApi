import Controller from "@/boot/http/controller.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import type ProductService from "@/services/product.service.js";
import type { TCatalogQuery } from "../../request-queries/catalog/catalog.query.js";
import ProductCatalogResource from "@/http/v1/resources/product/product.catalog.resource.js";
import ProductShowResource from "@/http/v1/resources/product/product.show.resource.js";


export default class ProductStoreController extends Controller {
    constructor(private readonly productService: ProductService) { super(); }

    public index: THttpLocals<{ reqQuery: TCatalogQuery }> = async (req, res) => {
        const {
            page,
            limit,
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
                limit,
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
            data: ProductCatalogResource.collection(data),
            links
        });
    };

    public show: THttpLocals<{ slug: string }> = async (_req, res) => {
        const slug = res.locals.slug;
        const product = await this.productService.masterShow(slug);
        return this.resOk(res, { data: ProductShowResource.transform(product) });
    };
}
