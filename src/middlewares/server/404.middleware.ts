import HTTPError from "@/boot/http/http.error.js";
import type { TMWare } from "@/boot/types/http.types.js";


export const notFoundHandler: TMWare = (req, res, next) => {
    throw HTTPError.notFound({
        message: 'Api route not found',
        detail: {
            path: 'route',
            message: req.originalUrl
        }
    });
};

export default notFoundHandler;