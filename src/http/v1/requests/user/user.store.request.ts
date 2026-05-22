import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const userStoreRequest = z.object({
    firstName: REQUEST_RULES.title(),
    lastName: REQUEST_RULES.title(),
    email: z.email('Invalid email'),
    password: z.string(REQUEST_ERRORS.invalidString).min(3, REQUEST_ERRORS.tooShort),
});

export type TUserStoreRequest = z.infer<typeof userStoreRequest>