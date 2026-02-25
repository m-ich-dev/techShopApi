export const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_CONTENT: 422,
    INTERNAL_SERVER: 500
} as const;

export type THttpCode = typeof HTTP_CODES[keyof typeof HTTP_CODES];