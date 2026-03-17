import Service from "../boot/service";
import { GenerateSlug } from "../boot/mixins/sluggable-service.mixin";
import { TBrandStoreRequest } from "../http/v1/requests/brand/brand.store.request";
import { TBrandUpdateRequest } from "../http/v1/requests/brand/brand.update.request";
import BrandRepository from "../repositories/brand/brand.repository";


export default class BrandService extends GenerateSlug(Service) {
    constructor(private readonly brandRepository: BrandRepository) { super(); }

    public async all() {
        const brands = await this.brandRepository.all({});
        return brands;
    }

    public async showBySlug(slug: string) {
        const brand = await this.brandRepository.first({ column: 'slug', value: slug });
        return brand;
    }
    public async store(data: TBrandStoreRequest) {
        const slug = await this.generateSlug(this.brandRepository, data.title);
        const insertData = { ...data, slug };
        const brand = await this.brandRepository.insert(insertData);
        return brand;
    }
    public async update(data: TBrandUpdateRequest, slug: string) {
        let updateData = data;
        if (data.title) {
            const updateSlug = await this.generateSlug(this.brandRepository, data.title);
            updateData = { ...data, slug: updateSlug };
        }
        return await this.brandRepository.update(updateData, { column: 'slug', value: slug });
    }
    public async delete(slug: string) {
        return await this.brandRepository.softDelete({ column: 'slug', value: slug });
    }
}