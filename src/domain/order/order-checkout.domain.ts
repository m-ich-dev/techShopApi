import HTTPError from "@/boot/http/http.error.js";
import type CartRepository from "@/repositories/cart/cart.repository.js";
import type OrderRepository from "@/repositories/order/order.repository.js";
import type OrderItemRepository from "@/repositories/order-item/order-item.repository.js";
import type OrderStatusRepository from "@/repositories/order-status/order-status.repository.js";
import type ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import type { TOrderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";


/**
 * Дефолтный статус только что созданного заказа.
 * Должен присутствовать в order_statuses (seed).
 */
const DEFAULT_ORDER_STATUS_TITLE = 'pending';

/**
 * Тип одной позиции корзины, возвращаемой cartRepository.cartWithVariants.
 */
type TCartItem = Awaited<ReturnType<CartRepository['cartWithVariants']>>[number];


export default class OrderCheckoutDomain {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly orderRepository: OrderRepository,
        private readonly orderItemRepository: OrderItemRepository,
        private readonly orderStatusRepository: OrderStatusRepository,
        private readonly productVariantRepository: ProductVariantRepository,
    ) { }

    /**
     * Оформление заказа из текущей корзины пользователя.
     *
     * Бизнес-правила:
     * - Берётся вся корзина целиком (выборочное оформление не поддерживается).
     * - Для каждой позиции атомарно списывается stock (UPDATE ... WHERE stock >= quantity).
     *   Если хотя бы для одной позиции списание не удалось — транзакция откатывается,
     *   возвращается HTTPError.conflict со списком всех проблемных позиций.
     * - title и price для order_items берутся из snapshot корзины на момент checkout.
     * - totalPrice считается в JS как сумма (price * quantity).
     * - После создания заказа корзина пользователя очищается одним запросом.
     * - Пустая корзина → HTTPError.badRequest.
     *
     * Вся операция выполняется в одной транзакции Kysely.
     */
    public async checkout(userId: string, dto: TOrderCheckoutRequest) {
        return await this.orderRepository.transaction(async (trx) => {
            // 1. Загружаем всю корзину целиком
            const cartItems = await this.cartRepository.cartWithVariants(userId, trx);

            if (cartItems.length === 0) {
                throw HTTPError.badRequest({
                    message: 'Cannot checkout an empty cart'
                });
            }

            // 2. Проверка целостности позиций: variant и price должны быть доступны
            this.assertCartItemsValid(cartItems);

            // 3. Дефолтный статус заказа
            const status = await this.orderStatusRepository.findByTitle(
                DEFAULT_ORDER_STATUS_TITLE,
                trx
            );

            // 4. Атомарное списание stock для каждой позиции.
            //    Сначала пытаемся списать для всех, собираем неудачные.
            const outOfStock: { id: number; title: string }[] = [];

            for (const item of cartItems) {
                const variant = item.variant!;
                const updated = await this.productVariantRepository.decrementStockIfAvailable(
                    variant.id,
                    item.quantity,
                    trx
                );

                if (!updated) {
                    outOfStock.push({ id: variant.id, title: variant.title });
                }
            }

            if (outOfStock.length > 0) {
                // Транзакция откатится автоматически при выбросе ошибки.
                throw HTTPError.conflict({
                    message: 'Some items are out of stock',
                    detail: outOfStock.map(({ id, title }) => ({
                        path: 'variant',
                        message: `variant id ${id} "${title}" has insufficient stock`
                    }))
                });
            }

            // 5. Считаем totalPrice в JS из snapshot корзины
            const totalPrice = cartItems.reduce(
                (sum, item) => sum + item.variant!.price!.current * item.quantity,
                0
            );

            // 6. Создаём заказ
            const order = await this.orderRepository.insert({
                userId,
                orderStatusId: status.id,
                totalPrice,
                shippingAddress: dto.shippingAddress,
                paymentMethod: dto.paymentMethod
            }, trx);

            // 7. Создаём order_items со snapshot title и price из корзины
            await this.orderItemRepository.bulkInsert(
                cartItems.map(item => ({
                    orderId: order.id,
                    productVariantId: item.variant!.id,
                    title: item.variant!.title,
                    quantity: item.quantity,
                    price: item.variant!.price!.current
                })),
                trx
            );

            // 8. Очищаем корзину пользователя одним запросом
            await this.cartRepository.deleteByUserId(userId, trx);

            // 9. Возвращаем заказ с позициями и статусом
            return await this.orderRepository.findByIdWithItems(order.id, userId, trx);
        });
    }

    /**
     * Проверка, что каждая позиция корзины имеет активный variant с установленной ценой.
     * variant может быть null, если вариант был soft-deleted после добавления в корзину.
     * price может быть null, если у варианта нет currentPriceId.
     */
    private assertCartItemsValid(items: TCartItem[]): void {
        const invalid: { id: number; message: string }[] = [];

        for (const item of items) {
            if (!item.variant) {
                invalid.push({
                    id: item.id,
                    message: 'product variant is no longer available'
                });
                continue;
            }
            if (!item.variant.price) {
                invalid.push({
                    id: item.variant.id,
                    message: `variant "${item.variant.title}" has no current price`
                });
            }
        }

        if (invalid.length > 0) {
            throw HTTPError.conflict({
                message: 'Some cart items are invalid',
                detail: invalid.map(({ id, message }) => ({
                    path: 'variant',
                    message: `variant id ${id}: ${message}`
                }))
            });
        }
    }
}