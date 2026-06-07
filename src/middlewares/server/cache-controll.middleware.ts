import type { TMWare } from "@/boot/types/http.types.js";


export default function setCache(maxAge?: number): TMWare {
    return (req, res, next) => {
        if (maxAge) {
            res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
        } else {
            res.setHeader('Cache-Control', 'no-store');
        }
        next();
    };
}