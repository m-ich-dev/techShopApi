import Service from "@/boot/service.js";
import type OrderCheckoutDomain from "@/domain/order/order-checkout.domain.js";
import type OrderRepository from "@/repositories/order/order.repository.js";
import type { TOrderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";
import type { TPaginateParams } from "@/boot/types/repository.types.js";


export default class OrderService extends Service {
    constructor(
        private readonly orderCheckoutDomain: OrderCheckoutDomain,
        private readonly orderRepository: OrderRepository,
    ) { super(); }

    /**
     * Оформление заказа из текущей корзины пользователя.
     * Делегирует бизнес-логику в OrderCheckoutDomain.
     */
    public async checkout(userId: string, dto: TOrderCheckoutRequest) {
        return await this.orderCheckoutDomain.checkout(userId, dto);
    }

    /**
     * Пагинированный список заказов пользователя.
     */
    public async index(userId: string, params: TPaginateParams) {
        return await this.orderRepository.paginateByUser(userId, params);
    }

    /**
     * Детальный просмотр заказа со связанными позициями.
     * IDOR-защита обеспечивается обязательным userId в findByIdWithItems.
     */
    public async show(userId: string, orderId: number) {
        return await this.orderRepository.findByIdWithItems(orderId, userId);
    }
}