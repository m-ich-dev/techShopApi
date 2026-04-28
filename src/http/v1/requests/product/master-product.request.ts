import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


export const masterProductRequest = z.object({
    categoryId: REQUEST_RULES.number(),
    brandId: REQUEST_RULES.number(),
    title: REQUEST_RULES.title(),
    variants: z.array(z.object({
        title: REQUEST_RULES.title(),
        stock: REQUEST_RULES.number().min(0).default(0),
        price: REQUEST_RULES.number().min(0).default(0),
        attributes: z.array(
            z.object({
                id: REQUEST_RULES.number(),
                title: REQUEST_RULES.title(),
                value: z.string().min(1, REQUEST_ERRORS.tooShort)
            })
        )
            .optional()
            .default([])
            .refine(arr => {
                const ids = arr.map(a => a.id);
                return new Set(ids).size === ids.length;
            }, "Duplicate attributes")
    })),
});

export type TMasterProductRequest = z.infer<typeof masterProductRequest>;