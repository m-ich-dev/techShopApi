import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "../../../../boot/enums/request-rules.enum";

export const variantStoreRequest = z.object({
    parentId: REQUEST_RULES.number().nonnegative(REQUEST_ERRORS.negativeNotAllowed),
    currentPriceId: REQUEST_RULES.number().nonnegative(REQUEST_ERRORS.negativeNotAllowed).nullish(),
    title: REQUEST_RULES.title(),
    stock: REQUEST_RULES.number().nonnegative(REQUEST_ERRORS.negativeNotAllowed).default(0),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TVariantStoreRequest = z.infer<typeof variantStoreRequest>;