import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { orderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";
import { orderListResponseSchema, orderShowResponseSchema } from "../schemas/order.docs-schema.js";


// Authorization-header с access-токеном. Все order-роуты требуют аутентификации.
const authorizationHeader = z.object({
    Authorization: z.string().openapi({ description: "Bearer <accessToken>" })
});

// Параметр {id} пути — положительное целое (resolveId middleware парсит и валидирует).
const idParam = z.object({
    id: z.number().int().positive().openapi({ description: "ID заказа" })
});


// Регистрирует order-роуты в переданном registry.
// Orders — публичный модуль (требует аутентификации),
// вызывается и для publicRegistry, и для fullRegistry.
export function registerOrderPaths(registry: OpenAPIRegistry): void {

    // GET /orders
    registry.registerPath({
        method: "get",
        path: "/orders",
        tags: ["store"],
        description: "Список заказов текущего пользователя с пагинацией.",
        request: {
            headers: authorizationHeader,
            query: z.object({
                page: z.coerce.number().positive().default(1).optional(),
                limit: z.coerce.number().positive().default(15).optional()
            })
        },
        responses: {
            "200": {
                description: "Список заказов с pagination links",
                content: { "application/json": { schema: orderListResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "422": { description: "Ошибка валидации query-параметров (page/limit)" }
        }
    });

    // GET /orders/{id}
    registry.registerPath({
        method: "get",
        path: "/orders/{id}",
        tags: ["store"],
        description: "Детальная информация по заказу, включая позиции (items).",
        request: {
            headers: authorizationHeader,
            params: idParam
        },
        responses: {
            "200": {
                description: "Заказ найден",
                content: { "application/json": { schema: orderShowResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "404": { description: "Заказ не найден (включая чужие заказы — IDOR-защита)" }
        }
    });

    // POST /orders/checkout
    registry.registerPath({
        method: "post",
        path: "/orders/checkout",
        tags: ["store"],
        description: "Оформление заказа из текущей корзины пользователя.",
        request: {
            headers: authorizationHeader,
            body: {
                content: { "application/json": { schema: orderCheckoutRequest } }
            }
        },
        responses: {
            "201": {
                description: "Заказ создан",
                content: { "application/json": { schema: orderShowResponseSchema } }
            },
            "400": { description: "Корзина пуста" },
            "401": { description: "Не авторизован" },
            "409": {
                description: "Конфликт: недостаточно stock у одной или нескольких позиций, либо вариант/цена стали недоступны"
            },
            "422": { description: "Ошибка валидации тела запроса" }
        }
    });
}
