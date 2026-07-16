import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";
import z from "zod";


export const paginateQuery = z.object({
    page: REQUEST_RULES.number().positive().default(1),
    limit: REQUEST_RULES.number().positive().default(15),
});

export type TPaginateQuery = z.infer<typeof paginateQuery>;