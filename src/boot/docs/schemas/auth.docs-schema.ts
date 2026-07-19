// Схема только для OpenAPI-документации.
// Соответствие типу Resource проверяется через satisfies на этапе компиляции.
import { z } from "zod";
import type { TUserClientResource } from "@/types/resources/user.resource.types.js";


// Ответ login/refresh/me: { data: { id, firstName, lastName, email } }
export const authUserResponseSchema = z.object({
    data: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email()
    })
}) satisfies z.ZodType<{ data: TUserClientResource }>;


// Ответ logout: { data: string }. Без satisfies — ответ «сырой» объект, отдельного TS-типа нет.
export const authMessageResponseSchema = z.object({
    data: z.string()
});