import db from "@/boot/database/db.kysely.js";
import CategoryRepository from "@/repositories/category/category.repository.js";
import BrandRepository from "@/repositories/brand/brand.repository.js";
import AttributeRepository from "@/repositories/attribute/attribute.repository.js";
import ProductRepository from "@/repositories/product/product.repository.js";
import ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import ProductVariantAttributeRepository from "@/repositories/product-variant-attribute/product-variant-attribute.repository.js";
import PriceRepository from "@/repositories/price/price.repository.js";
import UserRepository from "@/repositories/user/user.repository.js";
import RefreshTokenRepository from "@/repositories/token/refresh-token.repository.js";
import OrderStatusRepository from "@/repositories/order-status/order-status.repository.js";
import OrderRepository from "@/repositories/order/order.repository.js";
import OrderItemRepository from "@/repositories/order-item/order-item.repository.js";
import CartRepository from "@/repositories/cart/cart.repository.js";
import BookmarkRepository from "@/repositories/bookmark/bookmark.repository.js";


const categoryRepository = new CategoryRepository(db);
const brandRepository = new BrandRepository(db);
const attributeRepository = new AttributeRepository(db);
const productRepository = new ProductRepository(db);
const productVariantRepository = new ProductVariantRepository(db);
const productVariantAttributeRepository = new ProductVariantAttributeRepository(db);
const priceRepository = new PriceRepository(db);
const userRepository = new UserRepository(db);
const refreshTokenRepository = new RefreshTokenRepository(db);
const orderStatusRepository = new OrderStatusRepository(db);
const orderRepository = new OrderRepository(db);
const orderItemRepository = new OrderItemRepository(db);
const cartRepository = new CartRepository(db);
const bookmarkRepository = new BookmarkRepository(db);
export {
    categoryRepository,
    brandRepository,
    attributeRepository,
    productRepository,
    productVariantRepository,
    productVariantAttributeRepository,
    priceRepository,
    userRepository,
    refreshTokenRepository,
    orderStatusRepository,
    orderRepository,
    orderItemRepository,
    cartRepository,
    bookmarkRepository
};