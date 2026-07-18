import Controller from "@/boot/http/controller.js";
import type OrderService from "@/services/order.service.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import OrderResource from "@/http/v1/resources/order/order.resource.js";
import { HTTP_CODES } from "@/boot/enums/http.enum.js";


export default class OrderStoreController extends Controller {
    constructor(private readonly orderService: OrderService) { super(); }

    public checkout: THttpLocals<{ userId: string }> = async (req, res) => {
        const { userId } = res.locals;
        const order = await this.orderService.checkout(userId, req.body);

        return res.status(HTTP_CODES.CREATED).json({ data: OrderResource.transform(order) });
    };
}