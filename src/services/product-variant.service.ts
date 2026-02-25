import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";


export default class ProductVariantService {
    constructor(private readonly variantReadRepository: ProductVariantReadRepository) { }

    public async all() {
        const variants = await this.variantReadRepository.all();
        return variants;
    }

    public async showBySlug(slug: string) {
        const variant = await this.variantReadRepository.find('slug', slug);
        return variant;
    }

    public async allPivot() {
        const variants = await this.variantReadRepository.allPivot();
        return variants;
    }

    public async showPivotBySlug(slug: string) {
        const variant = await this.variantReadRepository.find('slug', slug);
        return variant;
    }
}