import { ZodAny } from "zod";
import { TMWare } from "../boot/types/http.types";


export function resolveFormRequest<T extends ZodAny>(zodSchema: T): TMWare {
    return async (req, res, next) => {
        try {
            const result = await zodSchema.parseAsync(req.body);
            req.body = result;
        } catch (e) {
            next(e);
        }
    };
}