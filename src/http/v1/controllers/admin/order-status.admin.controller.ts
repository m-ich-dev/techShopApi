import Controller from "@/boot/http/controller.js";
import HTTPError from "@/boot/http/http.error.js";
import type OrderStatusService from "@/services/order-status.service.js";
import type { THttp, THttpLocals } from "@/boot/types/http.types.js";
import type { TPaginateQuery } from "@/http/v1/request-queries/paginate.query.js";


export default class OrderStatusAdminController extends Controller {
    constructor(private readonly orderStatusService: OrderStatusService) { super(); }

    public index: THttpLocals<{ reqQuery: TPaginateQuery }> = async (req, res) => {
        const { page, limit } = res.locals.reqQuery;

        const { data, meta } = await this.orderStatusService.all({ page, limit });
        const links = this.paginationLinks(req, meta);

        return this.resOk(res, { data, links });
    };

    public store: THttp = async (req, res) => {
        const orderStatus = await this.orderStatusService.store(req.body);
        return this.resOk(res, { data: orderStatus });
    };

    public show: THttp<{ id: string }> = async (req, res) => {
        const id = this.parseId(req.params.id);
        const orderStatus = await this.orderStatusService.showById(id);
        return this.resOk(res, { data: orderStatus });
    };

    public update: THttp<{ id: string }> = async (req, res) => {
        const id = this.parseId(req.params.id);
        const orderStatus = await this.orderStatusService.update(req.body, id);
        return this.resOk(res, { data: orderStatus });
    };

    public destroy: THttp<{ id: string }> = async (req, res) => {
        const id = this.parseId(req.params.id);
        const result = await this.orderStatusService.delete(id);
        return this.resOk(res, { data: result });
    };

    private parseId(raw: string): number {
        const id = Number(raw);
        if (!Number.isInteger(id) || id <= 0) {
            throw HTTPError.badRequest({ message: 'id must be a positive integer', detail: { path: 'id', message: `with value: ${raw}` } });
        }
        return id;
    }
}