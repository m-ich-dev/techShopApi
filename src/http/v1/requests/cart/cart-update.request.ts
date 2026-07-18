import z from "zod";
import { REQUEST_RULES, REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const cartUpdateRequest = z.object({
    quantity: REQUEST_RULES.number()
        .int(REQUEST_ERRORS.invalidNumber)
        .min(1, REQUEST_ERRORS.negativeNotAllowed)
});

export type TCartUpdateRequest = z.infer<typeof cartUpdateRequest>;