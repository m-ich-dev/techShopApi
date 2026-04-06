import Service from "../boot/service";
import ProductRepository from "../repositories/product/product.repository";
import { GenerateSlug } from "../boot/mixins/sluggable-service.mixin";
import { TProductStoreRequest } from "../http/v1/requests/product/product.store.request";
import { TProductUpdateRequest } from "../http/v1/requests/product/product.update.request";
import CategoryRepository from "../repositories/category/category.repository";
import BrandRepository from "../repositories/brand/brand.repository";

export default class ProductService extends GenerateSlug(Service) {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly brandRepository: BrandRepository
    ) { super(); }

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

    public async store(data: TProductStoreRequest) {
        await this.categoryRepository.first({ column: 'id', value: data.categoryId });
        await this.brandRepository.first({ column: 'id', value: data.brandId });
        const slug = await this.generateSlug(this.productRepository, data.title);
        const insertData = { ...data, slug };
        return this.productRepository.insert(insertData);
    }

    public async update(data: TProductUpdateRequest, slug: string) {
        let updateData = data;
        if (updateData.categoryId) await this.categoryRepository.first({ column: 'id', value: updateData.categoryId });
        if (updateData.brandId) await this.brandRepository.first({ column: 'id', value: updateData.brandId });
        if (updateData.title) {
            const updateSlug = await this.generateSlug(this.productRepository, updateData.title);
            updateData = { ...data, slug: updateSlug };
        }
        const product = this.productRepository.update(updateData, { column: 'slug', value: slug });
        return product;
    }
    public async delete(slug: string) {
        const result = await this.productRepository.softDelete({ column: 'slug', value: slug });
        return result;
    }
}