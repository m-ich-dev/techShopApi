import { TInsertable } from "../boot/database/schemas/index.schema";
import ProductRepository from "../repositories/product/product.repository";


export default class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    public async all() {
        const products = await this.productRepository.all({});
        return products;
    }
    public async show(slug: string) {
        const product = await this.productRepository.first({ column: 'slug', value: slug });
        return product;
    }

    public async allPivot() {
        const products = await this.productRepository.allPivot({});
        return products;
    }

    public async showPivotBySlug(slug: string) {
        const product = await this.productRepository.firstWithPivot({ column: 'slug', value: slug });
        return product;
    }
    public async store<D extends TInsertable['products']>(data: D | D[]) {
        return this.productRepository.insert(data);
    }
}