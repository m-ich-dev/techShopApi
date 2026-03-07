import ProductVariantAdminController from "../../http/v1/controllers/admin/product-variant.admin.controller";
import ProductVariantRepository from "../../repositories/product-variant/product-variant.repository";
import ProductVariantService from "../../services/product-variant.service";
import db from "../database/db.kysely";


const productVariantRepository = new ProductVariantRepository(db);
const productVariantService = new ProductVariantService(productVariantRepository);
const productVariantAdminController = new ProductVariantAdminController(productVariantService);

export {
    productVariantRepository,
    productVariantAdminController,
};