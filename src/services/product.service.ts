import Service from "@/boot/service.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import CatalogFilter from "@/http/v1/filters/catalog.filter.js";
import type ProductRepository from "@/repositories/product/product.repository.js";
import type { TProductStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import type { TProductUpdateRequest } from "@/http/v1/requests/product/product.update.request.js";
import type { TPaginateParams } from "@/boot/types/repository.types.js";
import type ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import type { TCatalogFilters } from "@/types/filters/catalog-filter.types.js";


export default class ProductService extends GenerateSlug(Service) {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly variantRepository: ProductVariantRepository,
    ) { super(); }

    public async all(
        {
            page,
            limit,
            withTrash = false
        }:
            TPaginateParams
    ) {
        const productData = await this.productRepository.paginate({ page, limit, withTrash });
        return productData;
    }

    public async catalog({
        page,
        limit,
        withTrash,
        filters = {}
    }: {
        page?: number;
        limit?: number;
        withTrash?: boolean;
        filters: TCatalogFilters;
    }) {
        const filter = new CatalogFilter(filters);
        return await this.variantRepository.paginatePivot({
            page,
            limit,
            withTrash,
            build: (qb) => filter.apply(qb)
        });
    }

    public async allPivot(
        {
            page = 1,
            limit = 15,
            withTrash = false
        }:
            TPaginateParams
    ) {
        const productData = await this.productRepository.paginatePivot({ page, limit, withTrash });
        return productData;
    }

    public async show(slug: string) {
        const product = await this.productRepository.first({ column: 'slug', value: slug });
        return product;
    }

    public async masterShow(slug: string) {
        return await this.variantRepository.firstWithPivot({
            column: 'slug',
            value: slug,
            withAttrs: true
        });
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
        const product = await this.productRepository.update(updateData, { column: 'slug', value: slug });
        return product;
    }

    public async delete(slug: string) {
        const result = await this.productRepository.softDelete({ column: 'slug', value: slug });
        return result;
    }
}