import BrandController from "../http/controllers/brand.controller";
import CategoryController from "../http/controllers/category.controller";
import BrandReadRepository from "../repositories/brand/brand.read.repository";
import CategoryReadRepository from "../repositories/category/category.read.repository";
import { BrandService } from "../services/brand.service";
import CategoryService from "../services/category.service";



const categoryReadRepository = new CategoryReadRepository();
const brandReadRepository = new BrandReadRepository();

const categoryService = new CategoryService(categoryReadRepository);
const brandService = new BrandService(brandReadRepository);

const categoryController = new CategoryController(categoryService);
const brandController = new BrandController(brandService);


export {
    categoryController,
    brandController
};