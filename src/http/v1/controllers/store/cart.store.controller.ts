import Controller from "@/boot/http/controller.js";
import HTTPError from "@/boot/http/http.error.js";
import type CartService from "@/services/cart.service.js";
import type { THttp } from "@/boot/types/http.types.js";
import CartResource from "@/http/v1/resources/cart/cart.resource.js";


export default class CartStoreController extends Controller {
    constructor(private readonly cartService: CartService) { super(); }

    public index: THttp = async (req, res) => {
        const userId = this.getUserId(req);
        const items = await this.cartService.all(userId);

        return this.resOk(res, { data: CartResource.collection(items) });
    };

    public add: THttp = async (req, res) => {
        const userId = this.getUserId(req);
        const item = await this.cartService.add(userId, req.body);

        return this.resOk(res, { data: item });
    };

    public update: THttp<{ id: string }> = async (req, res) => {
        const userId = this.getUserId(req);
        const cartItemId = this.parseId(req.params.id);
        const item = await this.cartService.updateQuantity(userId, cartItemId, req.body);

        return this.resOk(res, { data: item });
    };

    public destroy: THttp<{ id: string }> = async (req, res) => {
        const userId = this.getUserId(req);
        const cartItemId = this.parseId(req.params.id);
        const result = await this.cartService.remove(userId, cartItemId);

        return this.resOk(res, { data: result });
    };

    private getUserId(req: Parameters<THttp>[0]): string {
        const userId = req.user?.userId;
        if (!userId) {
            throw HTTPError.unauthorized({ message: 'User is not authenticated' });
        }
        return userId;
    }

    private parseId(raw: string): number {
        const id = Number(raw);
        if (!Number.isInteger(id) || id <= 0) {
            throw HTTPError.badRequest({ message: 'id must be a positive integer', detail: { path: 'id', message: `with value: ${raw}` } });
        }
        return id;
    }
}