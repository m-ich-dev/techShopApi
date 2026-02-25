import ProductReadRepository from "../repositories/product/product.read.repository";


export default class ProductService {
    constructor(
        private readonly productReadRepository: ProductReadRepository,
    ) { }

    public async all() {
        const products = await this.productReadRepository.all();
        return products;
    }
    public async find(slug: string) {
        const product = await this.productReadRepository.findPivot('slug', slug);
        return product;
    }

    public async allPivot() {
        const products = await this.productReadRepository.allPivot();
        return products;
    }

    public async findPivot(slug: string) {
        const product = await this.productReadRepository.find('slug', slug);
        return product;
    }


}