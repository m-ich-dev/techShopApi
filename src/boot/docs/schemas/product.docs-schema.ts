// Схема только для OpenAPI-документации.
// Соответствие типам Resource проверяется через satisfies на этапе компиляции.
import { z } from "zod";
import type { TProductCatalogResource, TProductShowResource } from "@/types/resources/product.resource.types.js";


// Pagination links, возвращаемые контроллером для каталога.
export const paginationLinksSchema = z.object({
    self: z.string(),
    prev: z.string().nullable(),
    next: z.string().nullable(),
    first: z.string(),
    last: z.string()
});


// Элемент каталога: TProductCatalogResource.
export const productCatalogItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    stock: z.number(),
    brand: z.object({
        title: z.string(),
        slug: z.string()
    }),
    category: z.object({
        title: z.string(),
        slug: z.string()
    }),
    price: z.object({
        current: z.number(),
        old: z.number().nullable(),
        discountPercent: z.number().nullable()
    }).nullable()
}) satisfies z.ZodType<TProductCatalogResource>;


// Детальная страница: TProductShowResource (каталог + attributes).
export const productShowItemSchema = productCatalogItemSchema.extend({
    attributes: z.array(z.object({
        title: z.string(),
        value: z.string()
    }))
}) satisfies z.ZodType<TProductShowResource>;


// Ответ GET /products: { data: TProductCatalogResource[], links }.
export const productCatalogResponseSchema = z.object({
    data: z.array(productCatalogItemSchema),
    links: paginationLinksSchema
});


// Ответ GET /products/:slug: { data: TProductShowResource }.
export const productShowResponseSchema = z.object({
    data: productShowItemSchema
});


// Query-параметры каталога для OpenAPI.
// catalogQuery использует catchall для динамических атрибутов, что не отражается в OpenAPI —
// известные параметры описаны явно, динамические атрибуты упомянуты в description роута.
export const productCatalogQuerySchema = z.object({
    page: z.coerce.number().positive().default(1).optional(),
    limit: z.coerce.number().positive().default(15).optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional()
});
