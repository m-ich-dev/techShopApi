import Repositorty from "../../boot/repositories/repository";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import HTTPError from "../../boot/http/http.error";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import { Kysely, SelectType } from "kysely";
import { ENTITY_BY_TABLE } from "../../boot/enums/entities.enum";
import { TWhereParams } from "../../boot/types/repository.types";
import { Sluggable } from "../../boot/mixins/repository/sluggable-repository.mixin";
import { capitalize } from "../../boot/utils/capitalize";


export default class ProductVariantRepository extends Sluggable(Repositorty<'productVariants'>) {
    public readonly tableName: "productVariants" = 'productVariants';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    private queryWithPivot<T extends typeof this.tableName>(tableName: T, withTrash: boolean) {
        return this.qr(tableName, withTrash)
            .select((eb) => [
                jsonObjectFrom(
                    eb.selectFrom('prices')
                        .select(['prices.id', 'prices.price as current', 'prices.oldPrice as old'])
                        .whereRef('prices.id', '=', 't.currentPriceId')
                ).as('price'),
                jsonArrayFrom(
                    eb
                        .selectFrom('productVariantAttributes')
                        .innerJoin(
                            'attributes',
                            'attributes.id',
                            'productVariantAttributes.attributeId'
                        )
                        .select([
                            'attributes.id',
                            'attributes.title',
                            'productVariantAttributes.value'
                        ])
                        .whereRef(
                            'productVariantAttributes.productVariantId',
                            '=',
                            't.id'
                        )
                ).as('attributes')

            ]);
    }

    public async allPivot({ withTrash = false }:
        { withTrash?: boolean }) {
        return this.queryWithPivot(this.tableName, withTrash).execute();
    }

    public async firstWithPivot<
        T extends typeof this.tableName,
        Column extends keyof IDatabase[T] & string,
        Value extends SelectType<IDatabase[T][Column]>,
    >(
        { tableName = this.tableName, column, value, withTrash = false }:
            TWhereParams<typeof this.tableName, Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(tableName, withTrash);

        return await qr
            .where(ref(`t.${column}`), '=', value)
            .orderBy('t.id')
            .executeTakeFirstOrThrow(
                () => HTTPError.notFound({
                    message: `${capitalize(ENTITY_BY_TABLE[this.tableName])} not found`,
                    detail: { path: column, message: `with value: ${value}` }
                })
            );
    }

    public async getWithPivot<
        T extends typeof this.tableName,
        Column extends keyof IDatabase[T] & string,
        Value extends SelectType<IDatabase[T][Column]>,
    >(
        { tableName = this.tableName, column, value, withTrash = false }:
            TWhereParams<typeof this.tableName, Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(tableName, withTrash);

        return await qr
            .where(ref(`t.${column}`), '=', value)
            .orderBy('t.id')
            .execute();
    }
    // public async findBatchByParent(parentId: number) {
    //     return this.queryWithPivot()
    //         .where('productVariants.parentId', '=', parentId)
    //         .execute();
    // }

}