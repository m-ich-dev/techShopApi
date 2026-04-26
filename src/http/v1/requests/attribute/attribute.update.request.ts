import z from "zod";
import { attributeStoreRequest } from "@/http/v1/requests/attribute/attribute.store.request.js";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const attributeUpdatedRequest = attributeStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();

export type TAttributeUpdateRequest = z.infer<typeof attributeUpdatedRequest>;