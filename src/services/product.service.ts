import HTTPError from "../boot/http/http.error";
import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";
import ProductReadRepository from "../repositories/product/product.read.repository";
import MasterProduct from "../views/master-product.view";
import ProductVariant from "../views/product-variant.view";
import Product from "../views/product.view";



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

        const master = productRows.map(productRow => {
            const productVariants = variantRows.filter(variantRow => variantRow.parentId === productRow.id);
            return new MasterProduct({ product: productRow, variants: productVariants });
        });
        return master;
    }

    public async showMasterProduct(slug: string) {
        const productRow = await this.productReadRepository.findWithPivot(slug);
        if (!productRow) throw HTTPError.notFound(`Product with param:${slug} not found`);
        const variantRows = await this.productVariantReadRepository.findBatchByParent(productRow.id);
        return new MasterProduct({ product: productRow, variants: variantRows });
    }
}