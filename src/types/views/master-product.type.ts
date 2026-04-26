import type { TVariantView } from "@/types/views/product-variant.type.js";
import type { TProductView } from "@/types/views/product.type.js";


export type TMasterProductView = TProductView & {
    variants: TVariantView[]
}