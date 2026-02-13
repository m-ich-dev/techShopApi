import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";
import ProductReadRepository from "../repositories/product/product.read.repository";
import MasterProduct from "../views/master-product.view";



export default class ProductService {
    constructor(private readonly productReadRepository: ProductReadRepository,
        private readonly productVariantReadRepository: ProductVariantReadRepository
    ) { }

    public async allMasterProducts() {
        const products = await this.productReadRepository.allWithPivot();
        const variants = await this.productVariantReadRepository.allWithPivot();

        const master = products.map(product => {
            const productVariants = variants.filter(variant => variant.parentId = product.id);
            return new MasterProduct({ product, variants: productVariants });
        });
        return master;
    }
}