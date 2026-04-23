import { Kysely, SelectType, sql, Transaction } from "kysely";
import { AbstractConstructor } from "../../types/mixin.types";
import { IDatabase, TSoftDeletable } from "../../database/schemas/index.schema";
import { TSoftDeleteParams } from "../../types/repository.types";
import HTTPError from "../../http/http.error";
import { capitalize } from "../../utils/capitalize";
import { ENTITY_BY_TABLE } from "../../enums/entities.enum";
import Repository from "../../repositories/repository";


export function SoftDeletable<
    TTable extends keyof TSoftDeletable,
    TBase extends AbstractConstructor<Repository<TTable>>
>(Base: TBase) {
    type TInstanceTable = InstanceType<TBase>['tableName'];
    abstract class SoftDeletableRepository extends Base {

        protected abstract readonly db: Kysely<IDatabase>;

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
                .set({ deletedAt: sql`now()` } as any).where(ref('deletedAt'), 'is', null).where(ref(`${column}`), '=', value)
                .returningAll()
                .executeTakeFirstOrThrow(
                    () => HTTPError.notFound({
                        message: `Failed to soft delete record. ${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
                        detail: { path: column, message: `with value: ${value}` }
                    })
                );

        }
    }
    return SoftDeletableRepository;
}