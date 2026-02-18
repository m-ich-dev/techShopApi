import HTTPError from "../boot/http/http.error";
import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";
import ProductReadRepository from "../repositories/product/product.read.repository";
import MasterProduct from "../views/master-product.view";
import ProductVariant from "../views/product-variant.view";
import Product from "../views/product.view";
import { TProductVariantRow } from "../views/types/product-variant.types";



export default class ProductService {
    constructor(
        private readonly productReadRepository: ProductReadRepository,
        private readonly productVariantReadRepository: ProductVariantReadRepository
    ) { }

    public async allProducts() {
        const productRows = await this.productReadRepository.allWithPivot();
        return productRows.map(row => new Product(row));
    }
    public async allVariants() {
        const variantRows = await this.productVariantReadRepository.allWithPivot();
        return variantRows.map(row => new ProductVariant(row));
    }

    public async allMasterProducts() {
        const productRows = await this.productReadRepository.allWithPivot();
        const variantRows = await this.productVariantReadRepository.allWithPivot();

        const variantsMap = new Map<number, TProductVariantRow[]>();

        for (const variant of variantRows) {
            if (!variantsMap.has(variant.parentId)) {
                variantsMap.set(variant.parentId, []);
            }
            variantsMap.get(variant.parentId)!.push(variant);
        }

        return productRows.map(productRow =>
            new MasterProduct({
                product: productRow,
                variants: variantsMap.get(productRow.id) ?? []
            })
        );
    }

    public async showMasterProduct(slug: string) {
        const productRow = await this.productReadRepository.findWithPivot(slug);
        if (!productRow) throw HTTPError.notFound(`Product with param:${slug} not found`);
        const variantRows = await this.productVariantReadRepository.findBatchByParent(productRow.id);
        return new MasterProduct({ product: productRow, variants: variantRows });
    }
}