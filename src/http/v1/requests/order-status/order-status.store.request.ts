import z from "zod";
import { REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const orderStatusStoreRequest = z.object({
    title: REQUEST_RULES.title(),
    description: REQUEST_RULES.string().nullish()
});

export type TOrderStatusStoreRequest = z.infer<typeof orderStatusStoreRequest>;