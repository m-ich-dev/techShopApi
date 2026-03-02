import { TInsertable } from "../boot/database/schemas/index.schema";
import CategoryRepository from "../repositories/category/category.repository";


export default class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    public async all() {
        const category = await this.categoryRepository.all({});
        return category;
    }
    public async showBySlug(slug: string) {
        const category = await this.categoryRepository.first({ column: 'slug', value: slug });
        return category;
    }
    public async store<D extends TInsertable['categories']>(data: D | D[]) {
        return this.categoryRepository.insert(data);
    }
}