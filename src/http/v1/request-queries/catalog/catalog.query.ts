import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";
import z from "zod";
import { paginateQuery } from "../paginate.query.js";


export const catalogQuery = z.object({
    brand: REQUEST_RULES.string(),
    category: REQUEST_RULES.string(),
    minPrice: REQUEST_RULES.toPrice(),
    maxPrice: REQUEST_RULES.toPrice(),
})
    .extend(paginateQuery.shape)
    .catchall(z.union([z.string(), z.array(z.string())])).partial();

export type TCatalogQuery = z.infer<typeof catalogQuery>;