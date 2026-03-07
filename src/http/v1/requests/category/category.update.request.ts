import z from "zod";
import { categoryStoreRequest } from "../category.request";

export const brandUpdateRequest = categoryStoreRequest.partial({ title: true });
export type TBrandUpdateRequest = z.infer<typeof brandUpdateRequest>;