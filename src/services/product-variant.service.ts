import Service from "@/boot/service.js";
import ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import type { TVariantStoreRequest } from "@/http/v1/requests/product-variant/product-variant.store.request.js";
import type { TVariantUpdateRequest } from "@/http/v1/requests/product-variant/product-variant.update.request.js";


export default class ProductVariantService extends GenerateSlug(Service) {
    constructor(private readonly variantRepository: ProductVariantRepository) { super(); }

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

    public async store(data: TVariantStoreRequest) {
        const slug = await this.generateSlug(this.variantRepository, data.title);
        const variant = await this.variantRepository.insert({ ...data, slug });
        return variant;
    }

    public async update(data: TVariantUpdateRequest, slug: string) {
        let updateData = data;
        if (updateData.title) {
            const updateSlug = await this.generateSlug(this.variantRepository, updateData.title);
            updateData = { ...data, slug: updateSlug };
        }
        const variant = this.variantRepository.update(updateData, { column: 'slug', value: slug });
        return variant;
    }

    public async delete(slug: string) {
        const result = await this.variantRepository.softDelete({ column: 'slug', value: slug });
        return result;
    }
}