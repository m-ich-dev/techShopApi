import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";
import z from "zod";


export const catalogQuery = z.object({
    page: REQUEST_RULES.number().positive().default(1),
    brand: REQUEST_RULES.string(),
    category: REQUEST_RULES.string(),
    minPrice: REQUEST_RULES.toPrice(),
    maxPrice: REQUEST_RULES.toPrice(),
}).catchall(z.union([z.string(), z.array(z.string())])).partial();

export type TCatalogQuery = z.infer<typeof catalogQuery>;