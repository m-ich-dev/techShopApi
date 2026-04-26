import z from "zod";
import { productStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const productUpdateRequest = productStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();

export type TProductUpdateRequest = z.infer<typeof productUpdateRequest>;