import db from "../database/db.kysely";
import CategoryRepository from "../../repositories/category/category.repository";
import CategoryService from "../../services/category.service";
import CategoryAdminController from "../../http/v1/controllers/admin/category.admin.controller";
import CategoryStoreController from "../../http/v1/controllers/store/category.store.controller";


const categoryRepository = new CategoryRepository(db);
const categoryService = new CategoryService(categoryRepository);
const categoryAdminController = new CategoryAdminController(categoryService);
const categoryStoreController = new CategoryStoreController(categoryService);

export {
    categoryRepository,
    categoryAdminController,
    categoryStoreController,
};