import z, { ZodType } from "zod";
import type { TMWare } from "@/boot/types/http.types.js";
import HTTPError from "@/boot/http/http.error.js";


export function resolveFormRequest<T extends ZodType>(zodSchema: T): TMWare {
    return async (req, res, next) => {
        try {
            const result = await zodSchema.parseAsync(req.body);
            req.body = result;
            next();
        } catch (e) {
            if (e instanceof z.ZodError) {
                const detail = e.issues.map(issue => ({ path: issue.path.join(' '), message: issue.message }));
                throw HTTPError.unprocessable({ message: 'Validation form request error', detail });
            }
            next(e);
        }
    };
}