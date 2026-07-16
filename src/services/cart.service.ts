import Service from "@/boot/service.js";
import type CartRepository from "@/repositories/cart/cart.repository.js";
import type ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import type { TCartAddRequest } from "@/http/v1/requests/cart/cart-add.request.js";
import type { TCartUpdateRequest } from "@/http/v1/requests/cart/cart-update.request.js";


export default class CartService extends Service {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly productVariantRepository: ProductVariantRepository
    ) { super(); }

    /**
     * Добавить товар в корзину (upsert).
     * Проверяет существование и доступность варианта товара перед добавлением.
     */
    public async add(userId: string, { productVariantId, quantity }: TCartAddRequest) {
        await this.productVariantRepository.first({ column: 'id', value: productVariantId });

        return await this.cartRepository.addOrIncrement(userId, productVariantId, quantity);
    }

    /**
     * Обновить количество позиции корзины.
     * Проверяет принадлежность позиции пользователю.
     * quantity всегда >= 1 (валидация в Request).
     */
    public async updateQuantity(userId: string, cartItemId: number, data: TCartUpdateRequest) {
        await this.cartRepository.firstOwnedByUser(cartItemId, userId);

        return await this.cartRepository.update(
            { quantity: data.quantity },
            { column: 'id', value: cartItemId }
        );
    }

    /**
     * Удалить позицию из корзины.
     * Проверяет принадлежность позиции пользователю.
     */
    public async remove(userId: string, cartItemId: number) {
        await this.cartRepository.firstOwnedByUser(cartItemId, userId);
        await this.cartRepository.delete({ column: 'id', value: cartItemId });

        return { success: true };
    }

    /**
     * Список корзины пользователя с данными вариантов товаров и ценами.
     */
    public async all(userId: string) {
        return await this.cartRepository.cartWithVariants(userId);
    }
}