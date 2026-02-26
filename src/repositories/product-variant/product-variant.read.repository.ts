import ReadRepositorty from "../../boot/repositories/read.repository";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import HTTPError from "../../boot/http/http.error";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import { Kysely, SelectType } from "kysely";
import { TWhereType } from "../../boot/types/db.types";
import { ENTITY_BY_TABLE } from "../../boot/enums/entities.enum";


export default class ProductVariantReadRepository extends ReadRepositorty<'productVariants'> {
    public readonly tableName: "productVariants" = 'productVariants';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    private queryWithPivot<T extends typeof this.tableName>(tableName: T, withTrash: boolean) {
        return this.qr(tableName, withTrash)
            .leftJoin('prices as currentPrices', 'currentPrices.id', 't.currentPriceId')
            .select((eb) => [
                'currentPrices.price as price',
                'currentPrices.oldPrice as oldPrice',
                'currentPrices.discount as discount',
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
            TWhereType<typeof this.tableName, Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(tableName, withTrash);

        return await qr
            .where(ref(`t${column}`), '=', value)
            .orderBy('t.id')
            .executeTakeFirstOrThrow(() => HTTPError.notFound(`${ENTITY_BY_TABLE[this.tableName]} with ${column}: ${value} not found`));
    }

    public async getWithPivot<
        T extends typeof this.tableName,
        Column extends keyof IDatabase[T] & string,
        Value extends SelectType<IDatabase[T][Column]>,
    >(
        { tableName = this.tableName, column, value, withTrash = false }:
            TWhereType<typeof this.tableName, Column, Value>
    ) {

        const { ref } = this.db.dynamic;

        const qr = this.queryWithPivot(tableName, withTrash);

        return await qr
            .where(ref(`t${column}`), '=', value)
            .orderBy('t.id')
            .execute();
    }
    // public async findBatchByParent(parentId: number) {
    //     return this.queryWithPivot()
    //         .where('productVariants.parentId', '=', parentId)
    //         .execute();
    // }

}