import z from "zod";
import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const categoryStoreRequest = z.object({
    title: REQUEST_RULES.title(),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TCategoryStoreRequest = z.infer<typeof categoryStoreRequest>;