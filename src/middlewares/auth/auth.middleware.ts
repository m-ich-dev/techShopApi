import { JwtService } from "@/boot/container.js";
import HTTPError from "@/boot/http/http.error.js";
import type { NextFunction, Request, Response } from "express";


export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    const startsWith = 'Bearer ';
    if (!authHeader || !authHeader.startsWith(startsWith)) {
        throw HTTPError.unauthorized({
            message: "authentication failure"
        });
    }
    const accessToken = authHeader.slice(startsWith.length).trim();
    const payload = await JwtService.verifyAccessToken(accessToken);
    req.user = payload;
    next();
}