import z from "zod";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const cartAddRequest = z.object({
    productVariantId: z.coerce.number(REQUEST_ERRORS.invalidNumber)
        .int(REQUEST_ERRORS.invalidNumber)
        .positive(REQUEST_ERRORS.negativeNotAllowed),
    quantity: z.coerce.number(REQUEST_ERRORS.invalidNumber)
        .int(REQUEST_ERRORS.invalidNumber)
        .positive(REQUEST_ERRORS.negativeNotAllowed)
});

export type TCartAddRequest = z.infer<typeof cartAddRequest>;