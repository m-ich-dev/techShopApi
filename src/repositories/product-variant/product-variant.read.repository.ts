import ReadRepositorty from "../../boot/repositories/read.repository";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import HTTPError from "../../boot/http/http.error";
import { IDatabase, TPrimaryKey } from "../../boot/database/schemas/index.schema";
import { Selectable } from "kysely";


export default class ProductVariantReadRepository extends ReadRepositorty<'productVariants'> {
    public readonly tableName: "productVariants" = 'productVariants';

    protected query() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .selectAll();
    }
    private queryWithPivot() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .leftJoin('prices as currentPrices', 'currentPrices.id', 'productVariants.currentPriceId')
            .selectAll('productVariants')
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
                            'productVariants.id'
                        )
                ).as('attributes')

            ]);
    }


    public async allPivot() {
        return this.queryWithPivot().execute();
    }

    public async findPivot<K extends TPrimaryKey<'productVariants'>>(key: K, param: Selectable<IDatabase['productVariants']>[K]) {
        return this.queryWithPivot()
            .where(`productVariants.${key}`, '=', param as any)
            .executeTakeFirstOrThrow(() => HTTPError.notFound(`Variant with ${key}: ${param} not found`));
    }

    public async findBatchByParent(parentId: number) {
        return this.queryWithPivot()
            .where('productVariants.parentId', '=', parentId)
            .execute();
    }

}