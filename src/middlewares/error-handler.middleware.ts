import type { NextFunction, Request, Response } from "express";
import HTTPError from "@/boot/http/http.error.js";
import { DatabaseError } from "pg";
import { JOSEError } from "jose/errors";
import ResponseFormatter from "@/boot/http/response.formatter.js";


export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {

    if (error instanceof HTTPError) {
        const { status, errors } = ResponseFormatter.HTTPError(error);
        if (error.status >= 500) {
            req.log.error({
                errors
            });
        } else {
            req.log.warn({
                status,
                err: error,
                apiErrors: errors,
            }, 'request failed');
        }

        return res.status(status).json({
            errors
        });
    } else if (error instanceof DatabaseError) {
        const { status, errors } = ResponseFormatter.DBError(error);
        req.log.error({
            err: error,
            status,
            apiErrors: errors
        }, "database error");
        return res.status(status).json({
            errors
        });
    } else if (error instanceof JOSEError) {
        const { status, errors } = ResponseFormatter.JWT(error);
        req.log.warn({
            err: error,
            status,
            apiErrors: errors
        }, "jwt verification failed");
        return res.status(status).json({
            errors
        });
    }
    else if (error instanceof Error) {
        const { status, errors } = ResponseFormatter.Error(error);
        req.log.error({
            err: error,
            status,
            apiErrors: errors
        }, "unhandled application error");
        return res.status(status).json({
            errors
        });
    }
}