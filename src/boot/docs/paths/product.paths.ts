import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { productCatalogQuerySchema, productCatalogResponseSchema, productShowResponseSchema } from "../schemas/product.docs-schema.js";


// Регистрирует product/catalog-роуты в переданном registry.
// Catalog — публичный модуль, вызывается и для publicRegistry, и для fullRegistry.
export function registerProductPaths(registry: OpenAPIRegistry): void {

    // GET /products
    registry.registerPath({
        method: "get",
        path: "/products",
        tags: ["store"],
        description:
            "Каталог товаров с фильтрацией и пагинацией. " +
            "Поддерживаются фильтры по brand (slug), category (slug, фильтрация по всему поддереву категории: " +
            "сама категория + все потомки по parent_id), minPrice, maxPrice " +
            "и динамическим атрибутам (любой ключ, не указанный в схеме, трактуется как атрибут: " +
            "значения через запятую или повтор параметра).",
        request: {
            query: productCatalogQuerySchema
        },
        responses: {
            "200": {
                description: "Список товаров с pagination links",
                content: { "application/json": { schema: productCatalogResponseSchema } }
            },
            "422": { description: "Ошибка валидации query-параметров" }
        }
    });

    // GET /products/{slug}
    registry.registerPath({
        method: "get",
        path: "/products/{slug}",
        tags: ["store"],
        description: "Детальная страница товара по slug. Включает атрибуты товара.",
        request: {
            params: z.object({
                slug: z.string().openapi({ description: "Slug товара" })
            })
        },
        responses: {
            "200": {
                description: "Товар найден",
                content: { "application/json": { schema: productShowResponseSchema } }
            },
            "404": { description: "Товар не найден" }
        }
    });
}