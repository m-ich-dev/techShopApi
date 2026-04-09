import db from "../database/db.kysely";
import CategoryRepository from "../../repositories/category/category.repository";
import BrandRepository from "../../repositories/brand/brand.repository";
import AttributeRepository from "../../repositories/attribute/attribute.repository";
import ProductRepository from "../../repositories/product/product.repository";
import ProductVariantRepository from "../../repositories/product-variant/product-variant.repository";


const categoryRepository = new CategoryRepository(db);
const brandRepository = new BrandRepository(db);
const attributeRepository = new AttributeRepository(db);
const productRepository = new ProductRepository(db);
const productVariantRepository = new ProductVariantRepository(db);

export {
    categoryRepository,
    brandRepository,
    attributeRepository,
    productRepository,
    productVariantRepository
};