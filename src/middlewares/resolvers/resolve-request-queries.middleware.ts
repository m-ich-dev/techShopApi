import HTTPError from "@/boot/http/http.error.js";
import type { TMWare } from "@/boot/types/http.types.js";
import z, { type ZodType } from "zod";


export default function resolveReqQuery<T extends ZodType>(zodSchema: T): TMWare {
    return async (req, res, next) => {
        try {
            const result = await zodSchema.parseAsync(req.query);
            res.locals.reqQuery = result;
            next();
        } catch (e) {
            if (e instanceof z.ZodError) {
                const detail = e.issues.map(issue => ({ path: issue.path.join(' '), message: issue.message }));
                throw HTTPError.unprocessable({ message: 'Validation query request error', detail });
            }
            next(e);
        }
    };
}