import CategoryReadRepository from "../repositories/category/category.read.repository";


export default class CategoryService {
    constructor(private readonly categoryReadRepository: CategoryReadRepository) { }

    public async all() {
        const category = await this.categoryReadRepository.all();
        return category;
    }
    public async showBySlug(slug: string) {
        const category = await this.categoryReadRepository.find('slug', slug);
        return category;
    }
}