import { Kysely, type Transaction } from "kysely";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class BookmarkRepository extends Repository<'bookmarks'> {
    public readonly tableName: "bookmarks" = 'bookmarks';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    /**
     * Проверка наличия закладки для пары (userId, productVariantId).
     * Опирается на unique-индекс (userId, productVariantId).
     */
    public async exists(userId: string, productVariantId: number, trx?: Transaction<IDatabase>): Promise<boolean> {
        const executer = trx ?? this.db;

        const row = await executer
            .selectFrom(this.tableName)
            .where('userId', '=', userId)
            .where('productVariantId', '=', productVariantId)
            .select('id')
            .executeTakeFirst();

        return row !== undefined;
    }

    /**
     * Добавление закладки. Идемпотентно на уровне БД через onConflict().doNothing()
     * (unique-индекс userId+productVariantId): гонка при двойном клике не приведёт
     * к ошибке 500 — второй insert молча проигнорируется.
     */
    public async add(userId: string, productVariantId: number, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        await executer
            .insertInto(this.tableName)
            .values({ userId, productVariantId })
            .onConflict((oc) => oc
                .columns(['userId', 'productVariantId'])
                .doNothing()
            )
            .execute();
    }

    /**
     * Удаление закладки по productVariantId (не по bookmark.id):
     * фронтенду для кнопки-сердечка достаточно productVariantId из контекста карточки.
     */
    public async removeByVariant(userId: string, productVariantId: number, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        await executer
            .deleteFrom(this.tableName)
            .where('userId', '=', userId)
            .where('productVariantId', '=', productVariantId)
            .execute();
    }

    /**
     * Список закладок пользователя с данными варианта товара и ценой.
     * Без quantity и атрибутов — по аналогии с cartWithVariants.
     */
    public async bookmarksWithVariants(userId: string, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        return await executer
            .selectFrom(`${this.tableName} as t`)
            .where('t.userId', '=', userId)
            .select(['t.id'])
            .select((eb) => jsonObjectFrom(
                eb.selectFrom('productVariants')
                    .whereRef('productVariants.id', '=', 't.productVariantId')
                    .where('productVariants.deletedAt', 'is', null)
                    .select([
                        'productVariants.id',
                        'productVariants.title',
                        'productVariants.slug',
                        'productVariants.stock'
                    ])
                    .select((eb2) => jsonObjectFrom(
                        eb2.selectFrom('prices')
                            .whereRef('prices.id', '=', 'productVariants.currentPriceId')
                            .where('prices.deletedAt', 'is', null)
                            .select([
                                'prices.price as current',
                                'prices.oldPrice as old'
                            ])
                    ).as('price'))
            ).as('variant'))
            .orderBy('t.id', 'asc')
            .execute();
    }
}