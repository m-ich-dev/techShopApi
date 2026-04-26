import z from "zod";
import { categoryStoreRequest } from "@/http/v1/requests/category/category.store.request.js";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const categoryUpdateRequest = categoryStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();
export type TCategoryUpdateRequest = z.infer<typeof categoryUpdateRequest>;