import { HTTP_CODES, HTTP_TITLES, THttpCode, THttpTitle } from "../enums/http.enum";
import { IHTTPError, TErrorBodyDetail, THTTPErrorBody } from "../types/http-error.types";


export default class HTTPError extends Error implements IHTTPError {
    public readonly title: THttpTitle | 'HTTP API ERROR';
    public readonly detail?: TErrorBodyDetail;

    constructor(public readonly status: THttpCode, body: THTTPErrorBody) {
        super(body.message);
        this.name = 'HTTP API ERROR';
        this.title = body.title ?? HTTP_TITLES[status] ?? 'HTTP API ERROR';
        this.detail = body.detail;
    };

    static badRequest(body: THTTPErrorBody) {
        return new HTTPError(HTTP_CODES.BAD_REQUEST, body);
    }
    static notFound(body: THTTPErrorBody) {
        return new HTTPError(HTTP_CODES.NOT_FOUND, body);
    }
    static unauthorized(body: THTTPErrorBody) {
        return new HTTPError(HTTP_CODES.UNAUTHORIZED, body);
    }
    static unprocessable(body: THTTPErrorBody) {
        return new HTTPError(HTTP_CODES.UNPROCESSABLE_CONTENT, body);
    }
    static internalServer(body: THTTPErrorBody) {
        return new HTTPError(HTTP_CODES.INTERNAL_SERVER, body);
    }
}