import { Kysely, type Transaction } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import Repository from "@/boot/repositories/repository.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default class OrderRepository extends Repository<'orders'> {
    public readonly tableName: "orders" = 'orders';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    /**
     * Получение заказа по id со связанными позициями и статусом.
     * items и status подгружаются через подзапросы jsonArrayFrom/jsonObjectFrom.
     * Обязательный userId защищает от IDOR: метод физически нельзя вызвать
     * без проверки владения заказом — компилятор не даст забыть при будущем
     * использовании (например, в GET /orders/:id).
     */
    public async findByIdWithItems(id: number, userId: string, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        return await executer
            .selectFrom(`${this.tableName} as t`)
            .select([
                't.id',
                't.userId',
                't.orderStatusId',
                't.totalPrice',
                't.shippingAddress',
                't.paymentMethod',
                't.createdAt',
                't.updatedAt'
            ])
            .select((eb) => jsonObjectFrom(
                eb.selectFrom('orderStatuses')
                    .whereRef('orderStatuses.id', '=', 't.orderStatusId')
                    .select(['orderStatuses.id', 'orderStatuses.title'])
            ).as('status'))
            .select((eb) => jsonArrayFrom(
                eb.selectFrom('orderItems')
                    .whereRef('orderItems.orderId', '=', 't.id')
                    .select([
                        'orderItems.id',
                        'orderItems.productVariantId',
                        'orderItems.title',
                        'orderItems.quantity',
                        'orderItems.price'
                    ])
                    .orderBy('orderItems.id', 'asc')
            ).as('items'))
            .where('t.id', '=', id)
            .where('t.userId', '=', userId)
            .executeTakeFirstOrThrow(
                () => HTTPError.notFound({
                    message: `${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
                    detail: { path: 'id', message: `with value: ${id}` }
                })
            );
    }
}
