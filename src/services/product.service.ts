import ProductReadRepository from "../repositories/product/product.read.repository";


export default class ProductService {
    constructor(
        private readonly productReadRepository: ProductReadRepository,
    ) { }

    public async all() {
        const products = await this.productReadRepository.all({});
        return products;
    }
    public async show(slug: string) {
        const product = await this.productReadRepository.first({ column: 'slug', value: slug });
        return product;
    }

    public async allPivot() {
        const products = await this.productReadRepository.allPivot({});
        return products;
    }

    public async showPivotBySlug(slug: string) {
        const product = await this.productReadRepository.firstWithPivot({ column: 'slug', value: slug });
        return product;
    }
}