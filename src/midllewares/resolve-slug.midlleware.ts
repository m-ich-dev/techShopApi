import HTTPError from "../boot/http/http.error";
import { TMWare } from "../boot/types/http.types";


export const resolveSlug: TMWare = (req, res, next) => {
    const { slug } = req.params;

    if (Array.isArray(slug)) throw HTTPError.badRequest({ message: 'slug must be a string', detail: { path: slug, value: slug } });

    res.locals.slug = String(slug);
    next();
};