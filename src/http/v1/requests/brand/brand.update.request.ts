import z from "zod";
import { brandStoreRequest } from "@/http/v1/requests/brand/brand.store.request.js";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const brandUpdateRequest = brandStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();
export type TBrandUpdateRequest = z.infer<typeof brandUpdateRequest>;