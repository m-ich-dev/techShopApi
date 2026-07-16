import { Kysely, type Transaction } from "kysely";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default class CartRepository extends Repository<'cart'> {
    public readonly tableName: "cart" = 'cart';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    /**
     * Upsert: если строка для пары (userId, productVariantId) уже существует —
     * увеличивает quantity на переданное значение, иначе создаёт новую строку.
     * Опирается на unique-индекс (userId, productVariantId) в БД.
     */
    public async addOrIncrement(
        userId: string,
        productVariantId: number,
        quantity: number,
        trx?: Transaction<IDatabase>
    ) {
        const executer = trx ?? this.db;

        return await executer
            .insertInto(this.tableName)
            .values({ userId, productVariantId, quantity })
            .onConflict((oc) => oc
                .columns(['userId', 'productVariantId'])
                .doUpdateSet({
                    quantity: (eb) => eb('cart.quantity', '+', quantity)
                })
            )
            .returningAll()
            .executeTakeFirstOrThrow(
                () => HTTPError.internalServer({
                    message: `Failed to add item to ${ENTITY_BY_TABLE[this.tableName]}`
                })
            );
    }

    /**
     * Список корзины пользователя с данными варианта товара и ценой.
     * Вариант с soft-delete фильтрацией; price может быть null, если currentPriceId не задан.
     */
    public async cartWithVariants(userId: string, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        return await executer
            .selectFrom(`${this.tableName} as t`)
            .where('t.userId', '=', userId)
            .select([
                't.id',
                't.quantity'
            ])
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

    /**
     * Находит запись корзины по id с проверкой принадлежности пользователю.
     * Бросает notFound, если запись не существует или принадлежит другому пользователю.
     */
    public async firstOwnedByUser(id: number, userId: string, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        return await executer
            .selectFrom(`${this.tableName} as t`)
            .selectAll('t')
            .where('t.id', '=', id)
            .where('t.userId', '=', userId)
            .executeTakeFirstOrThrow(
                () => HTTPError.notFound({
                    message: `${capitalize(ENTITY_BY_TABLE[this.tableName])} item not found`,
                    detail: { path: 'id', message: `with value: ${id}` }
                })
            );
    }
}