import Service from "../boot/service.js";
import CategoryRepository from "../repositories/category/category.repository.js";
import { GenerateSlug } from "../boot/mixins/service/sluggable-service.mixin.js";
import type { TCategoryStoreRequest } from "../http/v1/requests/category/category.store.request.js";
import type { TCategoryUpdateRequest } from "../http/v1/requests/category/category.update.request.js";


export default class CategoryService extends GenerateSlug(Service) {
    constructor(private readonly categoryRepository: CategoryRepository) { super(); }

    public async all() {
        const category = await this.categoryRepository.all({});
        return category;
    }
    public async showBySlug(slug: string) {
        const category = await this.categoryRepository.first({ column: 'slug', value: slug });
        return category;
    }
    public async store(data: TCategoryStoreRequest) {
        const slug = await this.generateSlug(this.categoryRepository, data.title);
        const insertData = { ...data, slug };
        const category = await this.categoryRepository.insert(insertData);
        return category;
    }
    public async update(data: TCategoryUpdateRequest, slug: string) {
        let updateData = data;
        if (data.title) {
            const updateSlug = await this.generateSlug(this.categoryRepository, data.title);
            updateData = { ...data, slug: updateSlug };
        }
        const category = await this.categoryRepository.update(updateData, { column: 'slug', value: slug });
        return category;
    }
    public async delete(slug: string) {
        return await this.categoryRepository.delete({ column: 'slug', value: slug });
    }
}