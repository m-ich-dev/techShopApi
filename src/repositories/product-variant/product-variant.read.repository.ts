import { db } from "../../boot/database/db.knex";
import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordProductVariant, TPivotRecordProductVariant } from "../../records/product-variant.record";
import { TProductVariantRow, TVariantAttribute } from "../../views/types/product-variant.types";


export default class ProductVariantReadRepository extends ReadRepositorty<IRecordProductVariant> {
    protected tableName: string = 'product_variants';
    protected primaryKey: string = 'slug';
    protected softDelete: boolean = true;

    public variantPivotQuery() {
        return this.query()//product_variants
            .leftJoin('prices as current_prices', 'current_prices.id', 'product_variants.current_price_id')
            .leftJoin('product_variant_attributes', 'product_variants.id', 'product_variant_attributes.product_variant_id')
            .leftJoin('attributes', 'product_variant_attributes.attribute_id', 'attributes.id')
            .select<TPivotRecordProductVariant[]>(
                'product_variants.*',
                'current_prices.price as price',
                'current_prices.old_price as oldPrice',
                'current_prices.discount as discount',
                db.raw(`
                JSON_ARRAYAGG(
                    IF(
                        attributes.id IS NULL,
                        NULL,
                        JSON_OBJECT(
                            'id', attributes.id,
                            'title', attributes.title,
                            'value', product_variant_attributes.value
                        )
                    )
                ) as attributes
            `)
            );
    }

    public async allWithPivot(): Promise<TProductVariantRow[]> {
        const rows = await this.variantPivotQuery().groupBy('product_variants.id');
        return rows.map(row => ({
            ...row,
            attributes: row.attributes
                ? (JSON.parse(row.attributes) as TVariantAttribute[])
                    .filter(a => a !== null)
                : []
        }));
    }

    public async findWithPivot(param: string | number): Promise<TProductVariantRow | undefined> {
        const row = await this.variantPivotQuery().where(`${this.tableName}.${this.primaryKey}`, param).groupBy('product_variants.id').first();
        return row ? {
            ...row,
            attributes: row.attributes ? JSON.parse(row.attributes) : []
        } : undefined;
    }
    public async findBatchByParent(parentId: number): Promise<TProductVariantRow[]> {
        const rows = await this.variantPivotQuery().where('parent_id', parentId).groupBy('product_variants.id');

        return rows.map(row => ({
            ...row,
            attributes: row.attributes ? JSON.parse(row.attributes) : []
        }));
    }

}