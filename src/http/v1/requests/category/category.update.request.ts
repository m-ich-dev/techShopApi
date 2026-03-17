import z from "zod";
import { categoryStoreRequest } from "./category.store.request";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";


export const categoryUpdateRequest = categoryStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();
export type TCategoryUpdateRequest = z.infer<typeof categoryUpdateRequest>;