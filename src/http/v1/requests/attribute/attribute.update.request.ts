import z from "zod";
import { attributeStoreRequest } from "./attribute.store.request";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";


export const attributeUpdatedRequest = attributeStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();

export type TAttributeUpdateRequest = z.infer<typeof attributeUpdatedRequest>;