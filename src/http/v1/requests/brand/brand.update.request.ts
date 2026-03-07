import z from "zod";
import { brandStoreRequest } from "./brand.store.request";


export const brandUpdateSchema = brandStoreRequest.partial({ title: true });
export type TBrandUpdateRequest = z.infer<typeof brandUpdateSchema>;