import db from "../database/db.kysely";
import CategoryRepository from "../../repositories/category/category.repository";
import CategoryService from "../../services/category.service";
import CategoryAdminController from "../../http/v1/controllers/admin/category.admin.controller";


const categoryRepository = new CategoryRepository(db);
const categoryService = new CategoryService(categoryRepository);
const categoryAdminController = new CategoryAdminController(categoryService);

export {
    categoryAdminController
};