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

export const HTTP_TITLES = {
    200: 'Ok',
    201: 'Created',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    422: 'Unprocessable content',
    500: 'Internal server error',
} as const;

export type THttpTitle = typeof HTTP_TITLES[keyof typeof HTTP_TITLES];