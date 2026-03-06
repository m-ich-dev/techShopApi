import z from "zod";
import { productStoreRequest } from "./product.store.request";


export const productUpdateRequest = productStoreRequest.partial({ categoryId: true, brandId: true, title: true });

export type TProductUpdateRequest = z.infer<typeof productUpdateRequest>;