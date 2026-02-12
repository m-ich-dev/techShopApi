import { HTTP_CODES, THttpCode } from "./enums/http.enums";


export default class HTTPError extends Error {

    constructor(public status: THttpCode, message: string) {
        super(message);
        this.name = 'HTTP API error.';
    }

    static badRequest(message: string = 'Bad Request.') {
        return new HTTPError(HTTP_CODES.BAD_REQUEST, message);
    }

    static notFound(message: string = 'Not Found.') {
        return new HTTPError(HTTP_CODES.NOT_FOUND, message);
    }

    static unauthorized(message: string = 'Unauthorized.') {
        return new HTTPError(HTTP_CODES.UNAUTHORIZED, message);
    }

    static unprocessable(message: string = 'Unprocessable Content.') {
        return new HTTPError(HTTP_CODES.UNPROCESSABLE_CONTENT, message);
    }
}