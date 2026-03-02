import BrandController from "../http/controllers/brand.controller";
import CategoryController from "../http/controllers/category.controller";
import ProductController from "../http/controllers/product.controller";
import BrandRepository from "../repositories/brand/brand.repository";
import CategoryRepository from "../repositories/category/category.repository";
import ProductVariantRepository from "../repositories/product-variant/product-variant.repository";
import ProductRepository from "../repositories/product/product.repository";
import BrandService from "../services/brand.service";
import CategoryService from "../services/category.service";
import MasterProductService from "../services/master-product.service";
import ProductVariantService from "../services/product-variant.service";
import ProductService from "../services/product.service";
import db from "./database/db.kysely";



const categoryRepository = new CategoryRepository(db);
const brandRepository = new BrandRepository(db);
const productRepository = new ProductRepository(db);
const productVariantRepository = new ProductVariantRepository(db);


const categoryService = new CategoryService(categoryRepository);
const brandService = new BrandService(brandRepository);
const productService = new ProductService(productRepository);
const productVariantService = new ProductVariantService(productVariantRepository);
const masterProductService = new MasterProductService(productRepository, productVariantRepository);

const categoryController = new CategoryController(categoryService);
const brandController = new BrandController(brandService);
const productController = new ProductController(productService, masterProductService);

export {
    categoryController,
    brandController,
    productController
};