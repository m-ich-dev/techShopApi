import z from "zod";
import { brandStoreRequest } from "./brand.store.request";
import { REQUEST_ERRORS } from "../../../../boot/enums/request-rules.enum";


export const brandUpdateRequest = brandStoreRequest.extend({ slug: z.string(REQUEST_ERRORS.invalidString) }).partial();
export type TBrandUpdateRequest = z.infer<typeof brandUpdateRequest>;