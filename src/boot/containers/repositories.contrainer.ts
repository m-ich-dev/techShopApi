import db from "@/boot/database/db.kysely.js";
import CategoryRepository from "@/repositories/category/category.repository.js";
import BrandRepository from "@/repositories/brand/brand.repository.js";
import AttributeRepository from "@/repositories/attribute/attribute.repository.js";
import ProductRepository from "@/repositories/product/product.repository.js";
import ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";


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