import { z } from "zod";
import type { TCategoryTreeClientResource } from "@/types/resources/categoryTree.resource.types.js";


// Узел категории без children — базовая структура.
const categoryBaseNodeSchema = z.object({
    title: z.string(),
    slug: z.string(),
    parentId: z.number().nullable()
});


// Схема дерева категорий с фиксированной глубиной (3 уровня).
// z.lazy / бесконечная рекурсия не поддерживается генератором @asteasolutions/zod-to-openapi,
// поэтому глубина ограничена явно. Для каталога достаточно root → subcategory → leaf.
// satisfies проверяет соответствие типу TCategoryTreeClientResource на этапе компиляции.
export const categoryTreeResponseSchema = z.object({
    data: z.array(
        categoryBaseNodeSchema.extend({
            children: z.array(
                categoryBaseNodeSchema.extend({
                    children: z.array(
                        categoryBaseNodeSchema.extend({
                            children: z.array(categoryBaseNodeSchema)
                        })
                    )
                })
            )
        })
    )
}) satisfies z.ZodType<{ data: TCategoryTreeClientResource[] }>;