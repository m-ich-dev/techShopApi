import ProductAdminController from "../../http/v1/controllers/admin/product.admin.controller";
import ProductRepository from "../../repositories/product/product.repository";
import MasterProductService from "../../services/master-product.service";
import ProductService from "../../services/product.service";
import db from "../database/db.kysely";
import { productVariantRepository } from "./product-variant.container";


const productRepository = new ProductRepository(db);
const productService = new ProductService(productRepository);
const masterProductService = new MasterProductService(productRepository, productVariantRepository);
const productAdminController = new ProductAdminController(productService, masterProductService);

export {
    productAdminController
};