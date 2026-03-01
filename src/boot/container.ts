import BrandController from "../http/controllers/brand.controller";
import CategoryController from "../http/controllers/category.controller";
import ProductController from "../http/controllers/product.controller";
import BrandReadRepository from "../repositories/brand/brand.read.repository";
import CategoryReadRepository from "../repositories/category/category.read.repository";
import ProductVariantReadRepository from "../repositories/product-variant/product-variant.read.repository";
import ProductReadRepository from "../repositories/product/product.read.repository";
import { BrandService } from "../services/brand.service";
import CategoryService from "../services/category.service";
import MasterProductService from "../services/master-product.service";
import ProductVariantService from "../services/product-variant.service";
import ProductService from "../services/product.service";
import db from "./database/db.kysely";



const categoryReadRepository = new CategoryReadRepository(db);
const brandReadRepository = new BrandReadRepository(db);
const productReadRepository = new ProductReadRepository(db);
const productVariantReadRepository = new ProductVariantReadRepository(db);


const categoryService = new CategoryService(categoryReadRepository);
const brandService = new BrandService(brandReadRepository);
const productService = new ProductService(productReadRepository);
const productVariantService = new ProductVariantService(productVariantReadRepository);
const masterProductService = new MasterProductService(productReadRepository, productVariantReadRepository);

const categoryController = new CategoryController(categoryService);
const brandController = new BrandController(brandService);
const productController = new ProductController(productService, masterProductService);

export {
    categoryController,
    brandController,
    productController
};