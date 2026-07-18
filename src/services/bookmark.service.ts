import Service from "@/boot/service.js";
import type BookmarkRepository from "@/repositories/bookmark/bookmark.repository.js";
import type ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import type { TBookmarkToggleRequest } from "@/http/v1/requests/bookmark/bookmark-toggle.request.js";


export default class BookmarkService extends Service {
    constructor(
        private readonly bookmarkRepository: BookmarkRepository,
        private readonly productVariantRepository: ProductVariantRepository
    ) { super(); }

    /**
     * Идемпотентный toggle закладки: если существует — удаляет, иначе — добавляет.
     * Без транзакции: read-then-write в рамках одного запроса приемлем
     * (гонка даст максимум лишний toggle, не влияет на целостность денег/остатков).
     * Проверяет существование и не-удалённость варианта товара перед операцией.
     */
    public async toggle(userId: string, { productVariantId }: TBookmarkToggleRequest) {
        await this.productVariantRepository.first({ column: 'id', value: productVariantId });

        const exists = await this.bookmarkRepository.exists(userId, productVariantId);

        if (exists) {
            await this.bookmarkRepository.removeByVariant(userId, productVariantId);
            return { bookmarked: false };
        }

        await this.bookmarkRepository.add(userId, productVariantId);
        return { bookmarked: true };
    }

    /**
     * Список закладок пользователя с данными вариантов товаров.
     */
    public async all(userId: string) {
        return await this.bookmarkRepository.bookmarksWithVariants(userId);
    }
}