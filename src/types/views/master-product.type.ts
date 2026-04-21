import { TVariantView } from "./product-variant.type";
import { TProductView } from "./product.type";

export type TMasterProductView = TProductView & {
    variants: TVariantView[]
}