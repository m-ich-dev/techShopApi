import db from "../database/db.kysely";
import BrandAdminController from "../../http/v1/controllers/admin/brand.admin.controller";
import BrandRepository from "../../repositories/brand/brand.repository";
import BrandService from "../../services/brand.service";
import BrandStoreController from "../../http/v1/controllers/store/brand.store.controller";


const brandRepository = new BrandRepository(db);
const brandService = new BrandService(brandRepository);
const brandAdminController = new BrandAdminController(brandService);
const brandStoreController = new BrandStoreController(brandService);

export {
    brandRepository,
    brandAdminController,
    brandStoreController,
};