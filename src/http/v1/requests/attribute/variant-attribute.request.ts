import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const variantAttributeRequest = z.object({
    attributeId: z.coerce.number(REQUEST_ERRORS.invalidNumber),
    value: REQUEST_RULES.number().min(1, REQUEST_ERRORS.tooShort)
});

export type TVariantAttributeRequest = z.infer<typeof variantAttributeRequest>;