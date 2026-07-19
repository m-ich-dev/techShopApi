import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { cartAddRequest } from "@/http/v1/requests/cart/cart-add.request.js";
import { cartUpdateRequest } from "@/http/v1/requests/cart/cart-update.request.js";
import { cartDeleteResponseSchema, cartItemResponseSchema, cartListResponseSchema } from "../schemas/cart.docs-schema.js";


// Authorization-header с access-токеном. Все cart-роуты требуют аутентификации.
const authorizationHeader = z.object({
    Authorization: z.string().openapi({ description: "Bearer <accessToken>" })
});

// Параметр {id} пути — положительное целое (resolveId middleware парсит и валидирует).
const idParam = z.object({
    id: z.number().int().positive().openapi({ description: "ID позиции корзины" })
});


// Регистрирует cart-роуты в переданном registry.
// Cart — публичный модуль (доступен авторизованному пользователю),
// вызывается и для publicRegistry, и для fullRegistry.
export function registerCartPaths(registry: OpenAPIRegistry): void {

    // GET /cart
    registry.registerPath({
        method: "get",
        path: "/cart",
        tags: ["store"],
        description: "Список позиций корзины текущего пользователя с данными вариантов товаров и ценами.",
        request: {
            headers: authorizationHeader
        },
        responses: {
            "200": {
                description: "Список позиций корзины",
                content: { "application/json": { schema: cartListResponseSchema } }
            },
            "401": { description: "Не авторизован" }
        }
    });

    // POST /cart
    registry.registerPath({
        method: "post",
        path: "/cart",
        tags: ["store"],
        description: "Добавить товар в корзину (upsert: если вариант уже в корзине — количество увеличивается).",
        request: {
            headers: authorizationHeader,
            body: {
                content: { "application/json": { schema: cartAddRequest } }
            }
        },
        responses: {
            "200": {
                description: "Позиция добавлена (или увеличено количество)",
                content: { "application/json": { schema: cartItemResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "404": { description: "Вариант товара не найден" },
            "422": { description: "Ошибка валидации" }
        }
    });

    // PATCH /cart/{id}
    registry.registerPath({
        method: "patch",
        path: "/cart/{id}",
        tags: ["store"],
        description: "Обновить количество позиции корзины.",
        request: {
            headers: authorizationHeader,
            params: idParam,
            body: {
                content: { "application/json": { schema: cartUpdateRequest } }
            }
        },
        responses: {
            "200": {
                description: "Количество обновлено",
                content: { "application/json": { schema: cartItemResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "403": { description: "Позиция не принадлежит пользователю" },
            "404": { description: "Позиция не найдена" },
            "422": { description: "Ошибка валидации" }
        }
    });

    // DELETE /cart/{id}
    registry.registerPath({
        method: "delete",
        path: "/cart/{id}",
        tags: ["store"],
        description: "Удалить позицию из корзины.",
        request: {
            headers: authorizationHeader,
            params: idParam
        },
        responses: {
            "200": {
                description: "Позиция удалена",
                content: { "application/json": { schema: cartDeleteResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "403": { description: "Позиция не принадлежит пользователю" },
            "404": { description: "Позиция не найдена" }
        }
    });
}