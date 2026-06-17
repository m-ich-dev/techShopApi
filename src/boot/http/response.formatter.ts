import type { DatabaseError } from "pg";
import type HTTPError from "@/boot/http/http.error.js";
import { HTTP_CODES, HTTP_TITLES } from "@/boot/enums/http.enum.js";
import type { JOSEError } from "jose/errors";
import type { TErrorResponse } from "../types/http-error.types.js";


export default class ResponseFormatter {

    static HTTPError(error: HTTPError): TErrorResponse {

        return {
            status: error.status,
            errors: [{
                name: error.name,
                title: error.title,
                message: error.message,
                detail: error.detail
            }
            ]
        };
    }

    static DBError(error: DatabaseError): TErrorResponse {
        switch (error.code) {
            case '23503':
                return {
                    status: HTTP_CODES.NOT_FOUND,
                    errors: [
                        {
                            name: 'FOREIGN KEY ERROR',
                            title: HTTP_TITLES['404'],
                            message: `${error.constraint} not found`,
                            detail: {
                                path: 'foreign key',
                                message: error.detail || 'foreign key'
                            }
                        }
                    ]
                };
            case '23505':
                return {
                    status: HTTP_CODES.CONFLICT,
                    errors: [
                        {
                            name: 'UNIQUE CONSTRAINT ERROR',
                            title: HTTP_TITLES['409'],
                            message: 'Duplicate value',
                            detail: {
                                path: 'Duplicate',
                                message: error.constraint || 'Duplicate'
                            }
                        }
                    ]
                };
            default:
                return {
                    status: HTTP_CODES.INTERNAL_SERVER,
                    errors: [
                        {
                            name: 'DATABASE ERROR',
                            title: HTTP_TITLES['500'],
                            message: 'Database error',
                            detail: {
                                path: 'DB',
                                message: error.detail || 'DB'
                            }
                        }
                    ]

                };
        }
    }

    static JWT(error: JOSEError): TErrorResponse {
        return {
            status: HTTP_CODES.UNAUTHORIZED,
            errors: [
                {
                    name: 'HTPP API ERROR',
                    title: HTTP_TITLES['401'],
                    message: 'authentication failure',
                    detail: {
                        path: 'auth',
                        message: error.code
                    }
                }
            ]
        };
    }

    static Error(error: Error): TErrorResponse {
        return {
            status: HTTP_CODES.INTERNAL_SERVER,
            errors: [
                {
                    name: 'SERVER ERROR',
                    title: HTTP_TITLES[500],
                    message: 'Unknown server error',
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                }
            ]
        };
    }
}