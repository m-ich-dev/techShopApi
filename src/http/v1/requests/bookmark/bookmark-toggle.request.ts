import z from "zod";
import { REQUEST_RULES, REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const bookmarkToggleRequest = z.object({
    productVariantId: REQUEST_RULES.number()
        .int(REQUEST_ERRORS.invalidNumber)
        .positive(REQUEST_ERRORS.negativeNotAllowed)
});

export type TBookmarkToggleRequest = z.infer<typeof bookmarkToggleRequest>;