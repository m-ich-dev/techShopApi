import z from "zod";
import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const brandStoreRequest = z.object({
    title: REQUEST_RULES.title(),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TBrandStoreRequest = z.infer<typeof brandStoreRequest>;
