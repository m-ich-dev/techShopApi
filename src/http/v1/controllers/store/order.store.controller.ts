import Controller from "@/boot/http/controller.js";
import type OrderService from "@/services/order.service.js";
import type { THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";
import OrderListResource from "@/http/v1/resources/order/order.list.resource.js";
import OrderShowResource from "@/http/v1/resources/order/order.show.resource.js";
import { HTTP_CODES } from "@/boot/enums/http.enum.js";


export default class OrderStoreController extends Controller {
    constructor(private readonly orderService: OrderService) { super(); }

    public index: THttpLocals<{ userId: string, reqQuery: TPaginateQuery }> = async (req, res) => {
        const { userId } = res.locals;
        const { page, limit } = res.locals.reqQuery;

        const { data, meta } = await this.orderService.index(userId, { page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, {
            data: OrderListResource.collection(data),
            links
        });
    };

    public show: THttpLocals<{ userId: string, id: number }> = async (req, res) => {
        const { userId, id } = res.locals;
        const order = await this.orderService.show(userId, id);
        return this.resOk(res, { data: OrderShowResource.transform(order) });
    };

    public checkout: THttpLocals<{ userId: string }> = async (req, res) => {
        const { userId } = res.locals;
        const order = await this.orderService.checkout(userId, req.body);

        return res.status(HTTP_CODES.CREATED).json({ data: OrderShowResource.transform(order) });
    };
}