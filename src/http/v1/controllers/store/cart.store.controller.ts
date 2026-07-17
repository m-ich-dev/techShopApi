import Controller from "@/boot/http/controller.js";
import type CartService from "@/services/cart.service.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import CartResource from "@/http/v1/resources/cart/cart.resource.js";


export default class CartStoreController extends Controller {
    constructor(private readonly cartService: CartService) { super(); }

    public index: THttpLocals<{ userId: string }> = async (_req, res) => {
        const { userId } = res.locals;
        const items = await this.cartService.all(userId);

        return this.resOk(res, { data: CartResource.collection(items) });
    };

    public add: THttpLocals<{ userId: string }> = async (req, res) => {
        const { userId } = res.locals;
        const item = await this.cartService.add(userId, req.body);

        return this.resOk(res, { data: CartResource.transform(item) });
    };

    public update: THttpLocals<{ userId: string; id: number }> = async (req, res) => {
        const { userId, id } = res.locals;
        const item = await this.cartService.updateQuantity(userId, id, req.body);

        return this.resOk(res, { data: CartResource.transform(item) });
    };

    public destroy: THttpLocals<{ userId: string; id: number }> = async (_req, res) => {
        const { userId, id } = res.locals;
        const result = await this.cartService.remove(userId, id);

        return this.resOk(res, { data: result });
    };
}