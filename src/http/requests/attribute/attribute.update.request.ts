import z from "zod";
import { attributeStoreRequest } from "../attribute.request";


export const attributeUpdatedRequest = attributeStoreRequest.partial({ title: true, filterType: true });

export type TAttributeUpdateRequest = z.infer<typeof attributeUpdatedRequest>;