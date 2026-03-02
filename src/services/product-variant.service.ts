import { TInsertable } from "../boot/database/schemas/index.schema";
import ProductVariantRepository from "../repositories/product-variant/product-variant.repository";


export default class ProductVariantService {
    constructor(private readonly variantRepository: ProductVariantRepository) { }

    public async all() {
        const variants = await this.variantRepository.all({});
        return variants;
    }

    public async showBySlug(slug: string) {
        const variant = await this.variantRepository.first({ column: 'slug', value: slug });
        return variant;
    }

    public async allPivot() {
        const variants = await this.variantRepository.allPivot({});
        return variants;
    }

    public async showPivotBySlug(slug: string) {
        const variant = await this.variantRepository.firstWithPivot({ column: 'slug', value: slug });
        return variant;
    }

    public async store<D extends TInsertable['productVariants']>(data: D | D[]) {
        return this.variantRepository.insert(data);
    }
}