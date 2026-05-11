import HTTPError from "@/boot/http/http.error.js";
import type { TMWare } from "@/boot/types/http.types.js";


export const resolveSlug: TMWare = (req, res, next) => {
    const { slug } = req.params;

    if (Array.isArray(slug)) throw HTTPError.badRequest({ message: 'slug must be a string' });

    res.locals.slug = String(slug);
    next();
};