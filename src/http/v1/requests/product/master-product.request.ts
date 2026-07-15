import z from "zod";
import { REQUEST_ERRORS, REQUEST_RULES } from "@/boot/enums/request-rules.enum.js";


const attributeSchema = z.object({
    id: REQUEST_RULES.number(),
    title: REQUEST_RULES.title(),
    value: z.string().min(1, REQUEST_ERRORS.tooShort)
});

const variantSchema = z.object({
    title: REQUEST_RULES.title(),
    stock: REQUEST_RULES.number().min(0).default(0),
    price: REQUEST_RULES.toPrice(),
    oldPrice: REQUEST_RULES.toPrice().nullable().optional(),
    attributes: z.array(attributeSchema)
        .optional()
        .default([])
        .refine(arr => {
            const ids = arr.map(a => a.id);
            return new Set(ids).size === ids.length;
        }, "Duplicate attributes")
});

const parentSchema = z.object({
    categoryId: REQUEST_RULES.number(),
    brandId: REQUEST_RULES.number(),
    title: REQUEST_RULES.title()
});


export const masterProductRequest = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('attach'),
        parentId: REQUEST_RULES.number(),
        variants: z.array(variantSchema).min(1)
    }),
    z.object({
        type: z.literal('create'),
        parent: parentSchema,
        variants: z.array(variantSchema).min(1)
    })
]);

export type TMasterProductRequest = z.infer<typeof masterProductRequest>;