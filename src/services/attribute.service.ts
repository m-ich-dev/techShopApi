import Service from "@/boot/service.js";
import AttributeRepository from "@/repositories/attribute/attribute.repository.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import type { TAttributeStoreRequest } from "@/http/v1/requests/attribute/attribute.store.request.js";
import type { TAttributeUpdateRequest } from "@/http/v1/requests/attribute/attribute.update.request.js";


export default class AttributeService extends GenerateSlug(Service) {
    constructor(private readonly attributeRepository: AttributeRepository) { super(); }

    public async all() {
        const attributes = await this.attributeRepository.all({});
        return attributes;
    }

    public async showBySlug(slug: string) {
        const attribute = await this.attributeRepository.first({ column: 'slug', value: slug });
        return attribute;
    }
    public async store(data: TAttributeStoreRequest) {
        const slug = await this.generateSlug(this.attributeRepository, data.title);
        const insertData = { ...data, slug };
        const attribute = await this.attributeRepository.insert(insertData);
        return attribute;
    }
    public async update(data: TAttributeUpdateRequest, slug: string) {
        let updateData = data;
        if (data.title) {
            const updateSlug = await this.generateSlug(this.attributeRepository, data.title);
            updateData = { ...data, slug: updateSlug };
        }
        return await this.attributeRepository.update(updateData, { column: 'slug', value: slug });
    }
    public async delete(slug: string) {
        return await this.attributeRepository.softDelete({ column: 'slug', value: slug });
    }
}