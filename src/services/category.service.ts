import Service from "@/boot/service.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import type CategoryRepository from "@/repositories/category/category.repository.js";
import type { TCategoryStoreRequest } from "@/http/v1/requests/category/category.store.request.js";
import type { TCategoryUpdateRequest } from "@/http/v1/requests/category/category.update.request.js";
import type { TRecordCategory } from "@/boot/database/schemas/category.schema.js";
import type { TPaginateParams } from "@/boot/types/repository.types.js";


export type TCategoryBranch = TRecordCategory & {
    children: TCategoryBranch[]
}

export default class CategoryService extends GenerateSlug(Service) {
    constructor(private readonly categoryRepository: CategoryRepository) { super(); }

    public async all({
        page,
        limit,
        withTrash
    }:
        TPaginateParams
    ) {
        const category = await this.categoryRepository.paginate({ page, limit, withTrash });
        return category;
    }

    public async tree() {
        const categories = await this.categoryRepository.all();
        const tree = this.buildTree(categories);
        return tree;
    }

    private buildTree(data: TRecordCategory[]) {

        const categoryMap = new Map<number, TCategoryBranch>(data.map(d => [d.id, { ...d, children: [] }]));
        const tree: TCategoryBranch[] = [];
        data.forEach(c => {
            const category = categoryMap.get(c.id);
            if (!category) {
                return;
            }
            if (category.parentId !== null) {
                categoryMap.get(category.parentId)?.children.push(category);
            } else {
                tree.push(category);
            }
        });
        return tree;
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
        return await this.categoryRepository.softDelete({ column: 'slug', value: slug });
    }
}