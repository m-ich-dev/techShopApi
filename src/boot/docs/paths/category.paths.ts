import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { categoryTreeResponseSchema } from "../schemas/category.docs-schema.js";


// Регистрирует category-роуты в переданном registry.
// Categories — публичный модуль, вызывается и для publicRegistry, и для fullRegistry.
export function registerCategoryPaths(registry: OpenAPIRegistry): void {

    // GET /categories
    registry.registerPath({
        method: "get",
        path: "/categories",
        tags: ["store"],
        description:
            "Дерево категорий. Возвращает список корневых категорий с вложенными потомками " +
            "(по parent_id). Используется для навигации в каталоге.",
        responses: {
            "200": {
                description: "Дерево категорий",
                content: { "application/json": { schema: categoryTreeResponseSchema } }
            }
        }
    });
}