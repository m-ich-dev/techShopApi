// Схема только для OpenAPI-документации.
// Соответствие типу Resource проверяется через satisfies на этапе компиляции.
import { z } from "zod";
import type { TBookmarkResource } from "@/types/resources/bookmark.resource.types.js";


// Закладка: TBookmarkResource.
export const bookmarkItemSchema = z.object({
    id: z.number(),
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
}) satisfies z.ZodType<TBookmarkResource>;


// Ответ GET /bookmarks: { data: TBookmarkResource[] }.
export const bookmarkListResponseSchema = z.object({
    data: z.array(bookmarkItemSchema)
});


// Ответ POST /bookmarks/toggle: { data: { bookmarked: boolean } }.
// Без satisfies — ответ «сырой» объект, отдельного TS-типа нет.
export const bookmarkToggleResponseSchema = z.object({
    data: z.object({
        bookmarked: z.boolean()
    })
});