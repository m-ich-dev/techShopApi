import z from "zod";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";


export const variantAttributeRequest = z.object({
    attributeId: z.coerce.number(REQUEST_ERRORS.invalidNumber),
    value: z.coerce.string(REQUEST_ERRORS.invalidString).min(1, REQUEST_ERRORS.tooShort)
});

export type TVariantAttributeRequest = z.infer<typeof variantAttributeRequest>;