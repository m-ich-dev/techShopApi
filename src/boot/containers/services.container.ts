import * as repositories from "./repositories.contrainer";
import AttributeService from "../../services/attribute.service";
import BrandService from "../../services/brand.service";
import CategoryService from "../../services/category.service";
import ProductService from "../../services/product.service";
import ProductVariantService from "../../services/product-variant.service";


const categoryService = new CategoryService(repositories.categoryRepository);
const brandService = new BrandService(repositories.brandRepository);
const attributeService = new AttributeService(repositories.attributeRepository);
const productService = new ProductService(
    repositories.productRepository,
    repositories.categoryRepository,
    repositories.brandRepository
);
const productVariantService = new ProductVariantService(repositories.productVariantRepository);

export {
    categoryService,
    brandService,
    attributeService,
    productService,
    productVariantService
};