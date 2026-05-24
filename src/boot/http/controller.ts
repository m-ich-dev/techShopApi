import type { Request, Response } from "express";
import type { TPaginateMeta } from "../types/repository.types.js";
import { HTTP_CODES } from "../enums/http.enum.js";


export default abstract class Controller {

    protected currentUrl(req: Request) {
        const url = req.get('host') + req.originalUrl;
        return url;
    }
    private createPaginationLink(req: Request, targetPage: number) {
        const url = new URL(this.currentUrl(req));
        url.searchParams.set('page', targetPage.toString());
        return url.toString();
    }
    protected paginationLinks(req: Request, meta: TPaginateMeta) {
        return {
            self: this.currentUrl(req),
            prev: meta.page > 1 ? this.createPaginationLink(req, meta.prev) : null,
            next: meta.page < meta.last ? this.createPaginationLink(req, meta.next) : null,
            first: this.createPaginationLink(req, meta.first),
            last: this.createPaginationLink(req, meta.last)
        };
    }
    protected resOk(res: Response, payload: object) {
        return res.status(HTTP_CODES.OK).json(payload);
    }
}