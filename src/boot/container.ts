import CategoryController from "../controllers/category.controller";
import CategoryReadRepository from "../repositories/category/category.read.repository";
import CategoryService from "../services/category.service";



const categoryReadRepository = new CategoryReadRepository();

const categoryService = new CategoryService(categoryReadRepository);

const categoryController = new CategoryController(categoryService);


export {
    categoryController
};