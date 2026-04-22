import z from "zod";
import { variantStoreRequest } from "./product-variant.store.request";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";

export const variantUpdateRequest = variantStoreRequest
    .extend({ slug: z.string(REQUEST_ERRORS.invalidString) })
    .partial();

export type TVariantUpdateRequest = z.infer<typeof variantUpdateRequest>;