// Схема только для OpenAPI-документации.
// Соответствие типам Resource проверяется через satisfies на этапе компиляции.
import { z } from "zod";
import type { TOrderListResource, TOrderShowResource, TOrderItemResource } from "@/types/resources/order.resource.types.js";
import { paginationLinksSchema } from "./product.docs-schema.js";


// Элемент заказа: TOrderItemResource.
export const orderItemSchema = z.object({
    id: z.number(),
    productVariantId: z.number(),
    title: z.string(),
    quantity: z.number(),
    price: z.number()
}) satisfies z.ZodType<TOrderItemResource>;


// Заказ в списке: TOrderListResource.
export const orderListItemSchema = z.object({
    id: z.number(),
    totalPrice: z.number(),
    status: z.object({
        id: z.number(),
        title: z.string()
    }).nullable(),
    createdAt: z.coerce.date()
}) satisfies z.ZodType<TOrderListResource>;


// Детальный заказ: TOrderShowResource (список + items).
export const orderShowItemSchema = orderListItemSchema.extend({
    items: z.array(orderItemSchema)
}) satisfies z.ZodType<TOrderShowResource>;


// Ответ GET /orders: { data: TOrderListResource[], links }.
export const orderListResponseSchema = z.object({
    data: z.array(orderListItemSchema),
    links: paginationLinksSchema
});


// Ответ GET /orders/{id} и POST /orders/checkout: { data: TOrderShowResource }.
export const orderShowResponseSchema = z.object({
    data: orderShowItemSchema
});