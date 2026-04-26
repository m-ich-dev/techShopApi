import Service from "@/boot/service.js";
import ProductRepository from "@/repositories/product/product.repository.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import type { TProductStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import type { TProductUpdateRequest } from "@/http/v1/requests/product/product.update.request.js";


export default class ProductService extends GenerateSlug(Service) {
    constructor(
        private readonly productRepository: ProductRepository,
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
        const slug = await this.generateSlug(this.productRepository, data.title);
        const insertData = {
            ...data, slug
        };
        return this.productRepository.insert(insertData);
    }

    public async update(data: TProductUpdateRequest, slug: string) {
        let updateData = data;
        if (updateData.title) {
            const updateSlug = await this.generateSlug(this.productRepository, updateData.title);
            updateData = {
                ...data, slug: updateSlug
            };
        }
        const product = this.productRepository.update(updateData, { column: 'slug', value: slug });
        return product;
    }

    public async delete(slug: string) {
        const result = await this.productRepository.softDelete({ column: 'slug', value: slug });
        return result;
    }
}