import Controller from "@/boot/http/controller.js";
import type BookmarkService from "@/services/bookmark.service.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import BookmarkResource from "@/http/v1/resources/bookmark/bookmark.resource.js";


export default class BookmarkStoreController extends Controller {
    constructor(private readonly bookmarkService: BookmarkService) { super(); }

    public index: THttpLocals<{ userId: string }> = async (_req, res) => {
        const { userId } = res.locals;
        const items = await this.bookmarkService.all(userId);

        return this.resOk(res, { data: BookmarkResource.collection(items) });
    };

    public toggle: THttpLocals<{ userId: string }> = async (req, res) => {
        const { userId } = res.locals;
        const result = await this.bookmarkService.toggle(userId, req.body);

        return this.resOk(res, { data: result });
    };
}