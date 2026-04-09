import AttributeAdminController from "../../http/v1/controllers/admin/attribute.admin.controller";
import BrandAdminController from "../../http/v1/controllers/admin/brand.admin.controller";
import CategoryAdminController from "../../http/v1/controllers/admin/category.admin.controller";
import ProductVariantAdminController from "../../http/v1/controllers/admin/product-variant.admin.controller";
import ProductAdminController from "../../http/v1/controllers/admin/product.admin.controller";
import BrandStoreController from "../../http/v1/controllers/store/brand.store.controller";
import CategoryStoreController from "../../http/v1/controllers/store/category.store.controller";
import * as services from "./services.container";


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