import Service from "@/boot/service.js";
import type OrderCheckoutDomain from "@/domain/order/order-checkout.domain.js";
import type { TOrderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";


export default class OrderService extends Service {
    constructor(
        private readonly orderCheckoutDomain: OrderCheckoutDomain,
    ) { super(); }

    /**
     * Оформление заказа из текущей корзины пользователя.
     * Делегирует бизнес-логику в OrderCheckoutDomain.
     */
    public async checkout(userId: string, dto: TOrderCheckoutRequest) {
        return await this.orderCheckoutDomain.checkout(userId, dto);
    }
}