import type { NextFunction, Request, Response } from "express";
import HTTPError from "@/boot/http/http.error.js";
import { DatabaseError } from "pg";
import { HTTP_CODES, HTTP_TITLES } from "@/boot/enums/http.enum.js";


export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HTTPError) {
        return res.status(error.status).json({
            name: error.name,
            title: error.title,
            message: error.message,
            detail: error.detail
        });
    } else if (error instanceof DatabaseError) {
        if (error.code === '23503') {
            return res.status(HTTP_CODES['NOT_FOUND']).json({
                name: 'HTTP API ERROR',
                title: HTTP_TITLES['404'],
                message: `${error.constraint} not found`,
                detail: { path: 'foreign key', message: error.detail }
            });
        }
    }
    else if (error instanceof Error) {
        return res.status(500).json({
            message: 'Unknown server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}