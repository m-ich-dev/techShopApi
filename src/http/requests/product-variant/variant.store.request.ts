import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "../../../boot/enums/request-rules.enum";

export const variantStoreRequest = z.object({
    parentId: z.coerce.number(REQUEST_ERRORS.invalidNumber),
    stock: z.coerce.number(REQUEST_ERRORS.invalidNumber).nonnegative(REQUEST_ERRORS.negativeNotAllowed).default(0),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TVariantStoreRequest = z.infer<typeof variantStoreRequest>;