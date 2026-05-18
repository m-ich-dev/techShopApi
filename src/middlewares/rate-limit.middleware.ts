import HTTPError from "@/boot/http/http.error.js";
import type { Request, Response, NextFunction } from "express";
import rateLimit, { type Options } from "express-rate-limit";


type LimiterConfig = Partial<Options>;
// [Feature] rework to rate-limit-redis
const limiter = ({
    windowMs = 15 * 60 * 1000,
    limit = 100,
    standardHeaders = 'draft-8',
    legacyHeaders = false,
    ipv6Subnet = 56,
}: LimiterConfig) => {
    return rateLimit({
        windowMs,
        limit,
        standardHeaders,
        legacyHeaders,
        ipv6Subnet,
        handler: (req: Request, res: Response, next: NextFunction) => {
            next(HTTPError.tooManyReq({ message: 'Too many requests' }));
        }
    });
};

export default limiter;