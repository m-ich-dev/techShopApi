import type { Request } from "express";
import type { TPaginateMeta } from "../types/repository.types.js";


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
}