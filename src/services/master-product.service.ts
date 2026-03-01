import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";
import ProductReadRepository from "../repositories/product/product.read.repository";
import MasterProduct from "../views/master-product.view";


export default class MasterProductService {
    constructor(
        private readonly productReadRepository: ProductReadRepository,
        private readonly variantReadRepository: ProductVariantReadRepository
    ) { }

    public async all() {
        const products = await this.productReadRepository.allPivot({});
        const variants = await this.variantReadRepository.allPivot({});
        return products.map(product => new MasterProduct({ product, variants: variants.filter(v => v.parentId === product.id) }));
    }
}