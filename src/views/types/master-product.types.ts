import { TProductVariant } from "./product-variant.types";
import { TProduct } from "./product.types";

export type TMasterProduct = TProduct & {
    variants: TProductVariant[]
}