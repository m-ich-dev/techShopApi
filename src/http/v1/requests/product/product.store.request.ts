import z from "zod";
import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const productStoreRequest = z.object({
    categoryId: REQUEST_RULES.number(),
    brandId: REQUEST_RULES.number(),
    title: REQUEST_RULES.title(),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TProductStoreRequest = z.infer<typeof productStoreRequest>;