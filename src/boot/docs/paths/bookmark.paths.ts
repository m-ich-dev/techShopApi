import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { bookmarkToggleRequest } from "@/http/v1/requests/bookmark/bookmark-toggle.request.js";
import { bookmarkListResponseSchema, bookmarkToggleResponseSchema } from "../schemas/bookmark.docs-schema.js";


// Authorization-header с access-токеном. Все bookmark-роуты требуют аутентификации.
const authorizationHeader = z.object({
    Authorization: z.string().openapi({ description: "Bearer <accessToken>" })
});


// Регистрирует bookmark-роуты в переданном registry.
// Bookmarks — публичный модуль (требует аутентификации),
// вызывается и для publicRegistry, и для fullRegistry.
export function registerBookmarkPaths(registry: OpenAPIRegistry): void {

    // GET /bookmarks
    registry.registerPath({
        method: "get",
        path: "/bookmarks",
        tags: ["store"],
        description: "Список закладок текущего пользователя с данными вариантов товаров и ценами.",
        request: {
            headers: authorizationHeader
        },
        responses: {
            "200": {
                description: "Список закладок",
                content: { "application/json": { schema: bookmarkListResponseSchema } }
            },
            "401": { description: "Не авторизован" }
        }
    });

    // POST /bookmarks/toggle
    registry.registerPath({
        method: "post",
        path: "/bookmarks/toggle",
        tags: ["store"],
        description: "Идемпотентный toggle закладки: если закладка существует — удаляет, иначе — добавляет.",
        request: {
            headers: authorizationHeader,
            body: {
                content: { "application/json": { schema: bookmarkToggleRequest } }
            }
        },
        responses: {
            "200": {
                description: "Закладка добавлена или удалена",
                content: { "application/json": { schema: bookmarkToggleResponseSchema } }
            },
            "401": { description: "Не авторизован" },
            "404": { description: "Вариант товара не найден" },
            "422": { description: "Ошибка валидации" }
        }
    });
}