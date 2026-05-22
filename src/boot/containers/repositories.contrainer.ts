import db from "@/boot/database/db.kysely.js";
import CategoryRepository from "@/repositories/category/category.repository.js";
import BrandRepository from "@/repositories/brand/brand.repository.js";
import AttributeRepository from "@/repositories/attribute/attribute.repository.js";
import ProductRepository from "@/repositories/product/product.repository.js";
import ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import UserRepository from "@/repositories/user/user.repository.js";
import RefreshTokenRepository from "@/repositories/token/refresh-token.repository.js";


const categoryRepository = new CategoryRepository(db);
const brandRepository = new BrandRepository(db);
const attributeRepository = new AttributeRepository(db);
const productRepository = new ProductRepository(db);
const productVariantRepository = new ProductVariantRepository(db);
const userRepository = new UserRepository(db);
const refreshTokenRepository = new RefreshTokenRepository(db);
export {
    categoryRepository,
    brandRepository,
    attributeRepository,
    productRepository,
    productVariantRepository,
    userRepository,
    refreshTokenRepository
};