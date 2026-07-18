import { Kysely, type Transaction } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default class OrderStatusRepository extends Repository<'orderStatuses'> {
    public readonly tableName: "orderStatuses" = 'orderStatuses';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    /**
     * Поиск статуса заказа по title.
     * Бросает notFound, если статус не существует.
     */
    public async findByTitle(title: string, trx?: Transaction<IDatabase>) {
        const executer = trx ?? this.db;

        return await executer
            .selectFrom(this.tableName)
            .selectAll()
            .where('title', '=', title)
            .executeTakeFirstOrThrow(
                () => HTTPError.internalServer({
                    message: `${capitalize(ENTITY_BY_TABLE[this.tableName])} "${title}" not found. Ensure seed data is loaded.`
                })
            );
    }
}
