import HTTPError from "../boot/http.error";
import CategoryReadRepository from "../repositories/category/category.read.repository";
import Category from "../views/category.view";


export class CategoryService {
    constructor(private readonly categoryReadRepository: CategoryReadRepository) { }

    public async all() {
        const categoryRows = await this.categoryReadRepository.all();
        return categoryRows.map(row => new Category(row));
    }
    public async show(param: string | number) {
        const categoryRow = await this.categoryReadRepository.find(param);
        if (!categoryRow) throw HTTPError.notFound(`Category with param:${param} not found`);
        return new Category(categoryRow);
    }
}

export default new CategoryService(new CategoryReadRepository());