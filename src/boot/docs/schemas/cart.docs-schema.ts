// Схема только для OpenAPI-документации.
// Соответствие типу Resource проверяется через satisfies на этапе компиляции.
import { z } from "zod";
import type { TCartResource } from "@/types/resources/cart.resource.types.js";


// Элемент корзины: TCartResource.
export const cartItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    variant: z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        stock: z.number(),
        price: z.object({
            current: z.number(),
            old: z.number().nullable()
        }).nullable()
    }).nullable()
}) satisfies z.ZodType<TCartResource>;


// Ответ GET /cart: { data: TCartResource[] }.
export const cartListResponseSchema = z.object({
    data: z.array(cartItemSchema)
});


// Ответ POST /cart, PATCH /cart/{id}: { data: TCartResource }.
export const cartItemResponseSchema = z.object({
    data: cartItemSchema
});


// Ответ DELETE /cart/{id}: { data: { success: true } }. Без satisfies — ответ «сырой» объект.
export const cartDeleteResponseSchema = z.object({
    data: z.object({
        success: z.literal(true)
    })
});