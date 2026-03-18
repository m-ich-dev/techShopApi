import z from "zod";
import { REQUEST_RULES } from "../../../../boot/enums/request-rules.enum";


export const attributeStoreRequest = z.object({
    title: REQUEST_RULES.title(),
    filterType: z.enum(['range', 'checkbox']).nullable(),
    deletedAt: REQUEST_RULES.deletedAt()
});

export type TAttributeStoreRequest = z.infer<typeof attributeStoreRequest>;