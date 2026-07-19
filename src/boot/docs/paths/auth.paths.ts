import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { userLoginRequest } from "@/http/v1/requests/user/user.login.request.js";
import { userStoreRequest } from "@/http/v1/requests/user/user.store.request.js";
import { authUserResponseSchema, authMessageResponseSchema } from "../schemas/auth.docs-schema.js";

// Cookie-header с refresh-токеном.
// OpenAPI 3.0 не имеет отдельного поля для cookies — описываем через Cookie header.
const refreshTokenCookieHeader = z.object({
    Cookie: z.string().openapi({
        description:
            "refreshToken=<token>. httpOnly cookie, устанавливается сервером автоматически " +
            "после успешного login/register в том же браузере. При тестировании через " +
            "Swagger UI поле Cookie вручную заполнять не нужно — браузер сам передаст cookie " +
            "(прочитать httpOnly-cookie из JS невозможно)."
    })
});

// Authorization-header с access-токеном.
const authorizationHeader = z.object({
    Authorization: z.string().openapi({ description: "Bearer <accessToken>" })
});


// Регистрирует все auth-роуты в переданном registry.
// Auth — публичный модуль, вызывается и для publicRegistry, и для fullRegistry.
export function registerAuthPaths(registry: OpenAPIRegistry): void {

    // POST /auth/login
    registry.registerPath({
        method: "post",
        path: "/auth/login",
        tags: ["auth"],
        description: "Аутентификация пользователя. Возвращает access-токен в header Authorization, refresh-токен в httpOnly cookie.",
        request: {
            body: {
                content: { "application/json": { schema: userLoginRequest } }
            }
        },
        responses: {
            "200": {
                description: "Успешный вход",
                content: { "application/json": { schema: authUserResponseSchema } },
                headers: {
                    Authorization: { schema: { type: "string" }, description: "Bearer <accessToken>" },
                    "Set-Cookie": { schema: { type: "string" }, description: "refreshToken=<token>; HttpOnly" }
                }
            },
            "401": { description: "Неверные учётные данные" },
            "429": { description: "Превышен rate limit" }
        }
    });

    // POST /auth/register
    registry.registerPath({
        method: "post",
        path: "/auth/register",
        tags: ["auth"],
        description: "Регистрация нового пользователя. Возвращает access-токен в header Authorization, refresh-токен в httpOnly cookie.",
        request: {
            body: {
                content: { "application/json": { schema: userStoreRequest } }
            }
        },
        responses: {
            "201": {
                description: "Пользователь создан",
                content: { "application/json": { schema: authUserResponseSchema } },
                headers: {
                    Authorization: { schema: { type: "string" }, description: "Bearer <accessToken>" },
                    "Set-Cookie": { schema: { type: "string" }, description: "refreshToken=<token>; HttpOnly" }
                }
            },
            "409": { description: "Email уже занят" },
            "429": { description: "Превышен rate limit" }
        }
    });

    // POST /auth/refresh
    registry.registerPath({
        method: "post",
        path: "/auth/refresh",
        tags: ["auth"],
        description: "Обновление access-токена через refresh-токен из cookie.",
        request: {
            headers: refreshTokenCookieHeader
        },
        responses: {
            "200": {
                description: "Токен обновлён",
                content: { "application/json": { schema: authUserResponseSchema } },
                headers: {
                    Authorization: { schema: { type: "string" }, description: "Bearer <accessToken>" },
                    "Set-Cookie": { schema: { type: "string" }, description: "refreshToken=<token>; HttpOnly" }
                }
            },
            "401": { description: "Refresh-токен отсутствует, истёк или отозван" }
        }
    });

    // POST /auth/logout
    registry.registerPath({
        method: "post",
        path: "/auth/logout",
        tags: ["auth"],
        description: "Выход из аккаунта. Отзывает refresh-токен и очищает cookie.",
        request: {
            headers: refreshTokenCookieHeader
        },
        responses: {
            "200": {
                description: "Успешный выход",
                content: { "application/json": { schema: authMessageResponseSchema } }
            },
            "401": { description: "Refresh-токен отсутствует" }
        }
    });

    // GET /auth/me
    registry.registerPath({
        method: "get",
        path: "/auth/me",
        tags: ["auth"],
        description: "Текущий пользователь по access-токену.",
        request: {
            headers: authorizationHeader
        },
        responses: {
            "200": {
                description: "Данные текущего пользователя",
                content: { "application/json": { schema: authUserResponseSchema } }
            },
            "401": { description: "Не авторизован" }
        }
    });
}