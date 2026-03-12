import { NextFunction, Request, Response } from "express";
import HTTPError from "../boot/http/http.error";


export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HTTPError) {
        return res.status(error.status).json({
            context: error.context,
            title: error.title,
            message: error.message,
            detail: error.detail
        });
    }
    else if (error instanceof Error) {
        return res.status(500).json({
            message: 'Unknown server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}