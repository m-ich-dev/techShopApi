import z from "zod";
import { productStoreRequest } from "./product.store.request";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";


export const productUpdateRequest = productStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();

export type TProductUpdateRequest = z.infer<typeof productUpdateRequest>;