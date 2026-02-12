import { db } from "../../boot/database/db.knex";
import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordCategory } from "../../records/category.record";
import { TPivotProduct } from "../../views/master-product.view";


export default class ProductReadRepository extends ReadRepositorty<IRecordCategory> {
    protected readonly tableName: string = 'products';
    protected readonly primaryKey: string = 'slug';
    protected readonly softDelete: boolean = true;

    private productPivotQuery() {
        return this.query() //products
            .join('categories', 'products.category_id', 'categories.id')
            .join('brands', 'products.brand_id', 'brands.id')
            .join('prices as current_prices', 'current_price.id', 'products.current_price_id')
            .leftJoin('product_attributes', 'products.id', 'product_attributes.product_id')
            .leftJoin('attributes', 'product_attributes.attribute_id', 'attributes.id')
            .select<TPivotProduct[]>(
                'products.*',
                'categories.id as categoryId',
                'categories.title as categoryTitle',
                'brands.id as brandId',
                'brands.title as brandTitle',
                'current_prices.id as priceId',
                'current_prices.price as price',
                'current_prices.old_price as oldPrice',
                'current_prices.discount as discount',

                db.raw('JSON_OBJECTAGG(attributes.id, attributes.title, product_attributes.value) as attributes')
            );
    }

    public async allWithPivot() {
        return await this.productPivotQuery().groupBy('products.id');
    }

    public async findWithPivot(param: string | number) {
        return await this.productPivotQuery().where(`products.${this.primaryKey}`, param).groupBy('products.id').first();
    }
}