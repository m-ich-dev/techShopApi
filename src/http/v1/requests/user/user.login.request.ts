import z from "zod";
import { REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const userLoginRequest = z.object({
    email: z.email('Invalid email'),
    password: z.string(REQUEST_ERRORS.invalidString).min(3, REQUEST_ERRORS.tooShort),
});

export type TUserLoginRequest = z.infer<typeof userLoginRequest>    