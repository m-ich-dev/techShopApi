import z from "zod";
import { REQUEST_ERRORS } from "../../../boot/enums/request-rules.enum";
import { variantStoreRequest } from "./variant.store.request";


export const variantUpdateRequest = variantStoreRequest
    .partial({ parentId: true })
    .extend({
        stock: z.coerce.number(REQUEST_ERRORS.invalidNumber).nonnegative(REQUEST_ERRORS.negativeNotAllowed).optional()
    });