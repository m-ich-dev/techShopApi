import z from "zod";
import { variantStoreRequest } from "@/http/v1/requests/product-variant/product-variant.store.request.js";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const variantUpdateRequest = variantStoreRequest
    .extend({ slug: z.string(REQUEST_ERRORS.invalidString) })
    .partial();

export type TVariantUpdateRequest = z.infer<typeof variantUpdateRequest>;