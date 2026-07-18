import HTTPError from "@/boot/http/http.error.js";
import type { TMWare } from "@/boot/types/http.types.js";


export const resolveId: TMWare = (req, res, next) => {
    const { id } = req.params;

    if (Array.isArray(id)) throw HTTPError.badRequest({ message: 'id must be a string' });

    const parsed = Number(id);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw HTTPError.badRequest({
            message: 'id must be a positive integer',
            detail: { path: 'id', message: `with value: ${id}` }
        });
    }

    res.locals.id = parsed;
    next();
};