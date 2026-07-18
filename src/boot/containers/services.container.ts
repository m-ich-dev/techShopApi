import * as repositories from "@/boot/containers/repositories.container.js";
import AttributeService from "@/services/attribute.service.js";
import BrandService from "@/services/brand.service.js";
import CategoryService from "@/services/category.service.js";
import ProductService from "@/services/product.service.js";
import ProductVariantService from "@/services/product-variant.service.js";
import AuthService from "@/services/auth.service.js";
import JWTService from "@/services/jwt.service.js";
import OrderStatusService from "@/services/order-status.service.js";
import CartService from "@/services/cart.service.js";
import OrderService from "@/services/order.service.js";
import OrderCheckoutDomain from "@/domain/order/order-checkout.domain.js";


const categoryService = new CategoryService(repositories.categoryRepository);
const brandService = new BrandService(repositories.brandRepository);
const attributeService = new AttributeService(repositories.attributeRepository);
const productService = new ProductService(
    repositories.productRepository,
    repositories.productVariantRepository,
    repositories.priceRepository,
    repositories.productVariantAttributeRepository
);
const productVariantService = new ProductVariantService(repositories.productVariantRepository);
const JwtService = new JWTService();
const authService = new AuthService(
    repositories.userRepository,
    repositories.refreshTokenRepository,
    JwtService
);
const orderStatusService = new OrderStatusService(repositories.orderStatusRepository);
const cartService = new CartService(repositories.cartRepository, repositories.productVariantRepository);

const orderCheckoutDomain = new OrderCheckoutDomain(
    repositories.cartRepository,
    repositories.orderRepository,
    repositories.orderItemRepository,
    repositories.orderStatusRepository,
    repositories.productVariantRepository
);
const orderService = new OrderService(orderCheckoutDomain, repositories.orderRepository);


export {
    categoryService,
    brandService,
    attributeService,
    productService,
    productVariantService,
    authService,
    JwtService,
    orderStatusService,
    cartService,
    orderService
};
