import { sql, type SelectType, type Transaction } from "kysely";
import type { AbstractConstructor } from "@/boot/types/mixin.types.js";
import type { IDatabase, TSoftDeletable } from "@/boot/database/schemas/index.schema.js";
import type { TSoftDeleteParams } from "@/boot/types/repository.types.js";
import HTTPError from "@/boot/http/http.error.js";
import { capitalize } from "@/boot/utils/capitalize.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import Repository from "@/boot/repositories/repository.js";


export function SoftDeletable<
    TTable extends keyof TSoftDeletable,
    TBase extends AbstractConstructor<Repository<TTable>>
>(
    Base: TBase
) {
    type TInstanceTable = InstanceType<TBase>['tableName'];
    abstract class SoftDeletableRepository extends Base {

        public async softDelete<
            Column extends keyof IDatabase[TInstanceTable] & string,
            Value extends SelectType<IDatabase[TInstanceTable][Column]>,
        >(
            { column, value }: TSoftDeleteParams<Column, Value>,
            trx?: Transaction<IDatabase>
        ) {
            const { table, ref } = this.db.dynamic;
            const executer = trx ?? this.db;

            return await executer.updateTable(table(this.tableName).as('t'))
                .set({ deletedAt: sql`now()` } as any)
                .where(ref('deletedAt'), 'is', null)
                .where(ref(`${column}`), '=', value)
                .returningAll()
                .executeTakeFirstOrThrow(
                    () => HTTPError.notFound({
                        message: `Failed to soft delete record. ${capitalize(ENTITY_BY_TABLE[this.tableName as keyof typeof ENTITY_BY_TABLE])} not found`,
                        detail: { path: column, message: `with value: ${value}` }
                    })
                );
        }
    }

    return SoftDeletableRepository as unknown as TBase & {
        new(...args: any[]): {
            softDelete<
                Column extends keyof IDatabase[TInstanceTable] & string,
                Value extends SelectType<IDatabase[TInstanceTable][Column]>,
            >(
                params: TSoftDeleteParams<Column, Value>,
                trx?: Transaction<IDatabase>
            ): Promise<SelectType<IDatabase[TTable]>>
        }
    };
}