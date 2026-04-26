import * as repositories from "@/boot/containers/repositories.contrainer.js";
import AttributeService from "@/services/attribute.service.js";
import BrandService from "@/services/brand.service.js";
import CategoryService from "@/services/category.service.js";
import ProductService from "@/services/product.service.js";
import ProductVariantService from "@/services/product-variant.service.js";


const categoryService = new CategoryService(repositories.categoryRepository);
const brandService = new BrandService(repositories.brandRepository);
const attributeService = new AttributeService(repositories.attributeRepository);
const productService = new ProductService(repositories.productRepository);
const productVariantService = new ProductVariantService(repositories.productVariantRepository);

export {
    categoryService,
    brandService,
    attributeService,
    productService,
    productVariantService
};