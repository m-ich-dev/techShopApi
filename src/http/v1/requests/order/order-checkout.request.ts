import z from "zod";
import { REQUEST_RULES, REQUEST_ERRORS } from "@/boot/enums/request-rules.enum.js";


export const PAYMENT_METHODS = ['card', 'cash_on_delivery'] as const;
export type TPaymentMethod = typeof PAYMENT_METHODS[number];


export const orderCheckoutRequest = z.object({
    shippingAddress: REQUEST_RULES.string()
        .min(5, REQUEST_ERRORS.tooShort)
        .trim(),
    paymentMethod: z.enum(PAYMENT_METHODS)
});

export type TOrderCheckoutRequest = z.infer<typeof orderCheckoutRequest>;