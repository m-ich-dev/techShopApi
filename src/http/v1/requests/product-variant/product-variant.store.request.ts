import z from "zod";
import { variantAttributeRequest } from "../attribute/variant-attribute.request";
import { REQUEST_ERRORS } from "../../../boot/enums/request-rules.enum";

export const productVariantRequest = z.object({
    stock: z.coerce.number(REQUEST_ERRORS.invalidNumber).nonnegative(REQUEST_ERRORS.negativeNotAllowed),
    attributes: z.array(variantAttributeRequest).min(1, REQUEST_ERRORS.tooShort),
});