import z from "zod";
import { REQUEST_RULES, REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const cartAddRequest = z.object({
    productVariantId: REQUEST_RULES.number()
        .int(REQUEST_ERRORS.invalidNumber)
        .positive(REQUEST_ERRORS.negativeNotAllowed),
    quantity: REQUEST_RULES.number()
        .int(REQUEST_ERRORS.invalidNumber)
        .positive(REQUEST_ERRORS.negativeNotAllowed)
});

export type TCartAddRequest = z.infer<typeof cartAddRequest>;