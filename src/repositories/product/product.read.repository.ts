import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordProduct } from "../../records/product.record";
import { TProductRow } from "../../views/types/product.types";


export default class ProductReadRepository extends ReadRepositorty<IRecordProduct> {
    protected readonly tableName: string = 'products';
    protected readonly primaryKey: string = 'slug';
    protected readonly softDelete: boolean = true;

    private productPivotQuery() {
        return this.query() //products
            .join('categories', 'products.category_id', 'categories.id')
            .join('brands', 'products.brand_id', 'brands.id')
            .select<TProductRow[]>(
                'products.*',
                'categories.title as categoryTitle',
                'brands.title as brandTitle',
            );
    }

    public async allWithPivot() {
        return await this.productPivotQuery().groupBy('products.id');
    }

    public async findWithPivot(param: string | number) {
        return await this.productPivotQuery().where(`products.${this.primaryKey}`, param).groupBy('products.id').first();
    }
}