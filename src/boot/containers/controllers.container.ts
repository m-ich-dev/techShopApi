import AttributeAdminController from "@/http/v1/controllers/admin/attribute.admin.controller.js";
import BrandAdminController from "@/http/v1/controllers/admin/brand.admin.controller.js";
import CategoryAdminController from "@/http/v1/controllers/admin/category.admin.controller.js";
import ProductVariantAdminController from "@/http/v1/controllers/admin/product-variant.admin.controller.js";
import ProductAdminController from "@/http/v1/controllers/admin/product.admin.controller.js";
import BrandStoreController from "@/http/v1/controllers/store/brand.store.controller.js";
import CategoryStoreController from "@/http/v1/controllers/store/category.store.controller.js";
import * as services from "@/boot/containers/services.container.js";


const categoryAdminController = new CategoryAdminController(services.categoryService);
const categoryStoreController = new CategoryStoreController(services.categoryService);
const brandAdminController = new BrandAdminController(services.brandService);
const brandStoreController = new BrandStoreController(services.brandService);
const attributeAdminController = new AttributeAdminController(services.attributeService);
const productAdminController = new ProductAdminController(services.productService);
const productVariantAdminController = new ProductVariantAdminController(services.productVariantService);

export {
    categoryAdminController,
    categoryStoreController,
    brandAdminController,
    brandStoreController,
    attributeAdminController,
    productAdminController,
    productVariantAdminController
};