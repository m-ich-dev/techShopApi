import type { Kysely, SelectType } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import type { TWhereParams } from "@/boot/types/repository.types.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default class ProductVariantRepository extends SoftDeletable(Sluggable(Repository<'productVariants'>)) {
    public readonly tableName: "productVariants" = 'productVariants';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    private queryWithPivot(withTrash: boolean) {
        const { table, ref } = this.db.dynamic;

        let query = this.db.selectFrom(table(this.tableName).as('t'));

        if (this.softDeletable && !withTrash) {
            query = query.where(ref('t.deletedAt'), 'is', null);
        }
        return query
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

    public async allPivot(
        { withTrash = false }: { withTrash?: boolean }
    ) {
        return this.queryWithPivot(withTrash).execute();
    }

    public async firstWithPivot<
        T extends typeof this.tableName,
        Column extends keyof IDatabase[T] & string,
        Value extends SelectType<IDatabase[T][Column]>,
    >(
        { column, value, withTrash = false }:
            TWhereParams<Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(withTrash);

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
        { column, value, withTrash = false }:
            TWhereParams<Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(withTrash);

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