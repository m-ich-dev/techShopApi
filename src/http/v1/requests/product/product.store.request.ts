import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "../../../../boot/enums/request-rules.enum";


export const productStoreRequest = z.object({
    categoryId: z.coerce.number(REQUEST_ERRORS.invalidNumber),
    brandId: z.coerce.number(REQUEST_ERRORS.invalidNumber),
    title: REQUEST_RULES.title(),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TProductStoreRequest = z.infer<typeof productStoreRequest>;