import { Selectable } from "kysely";
import { IDatabase, TPrimaryKey } from "../../boot/database/schemas/index.schema";
import HTTPError from "../../boot/http/http.error";
import ReadRepositorty from "../../boot/repositories/read.repository";


export default class ProductReadRepository extends ReadRepositorty<'products'> {
    public readonly tableName: "products" = 'products';

    protected query() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .selectAll();
    }

    protected queryWithPivot() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .innerJoin('categories', 'categories.id', 'products.categoryId')
            .innerJoin('brands', 'brands.id', 'products.brandId')
            .selectAll('products')
            .select([
                'categories.title as categoryTitle',
                'brands.title as brandTitle'
            ]);
    }
    public allPivot() {
        return this.queryWithPivot().execute();
    }
    public findPivot<K extends TPrimaryKey<'products'>>(key: K, param: Selectable<IDatabase['products']>[K]) {
        return this.queryWithPivot()
            .where(`products.${key}`, '=', param as any)
            .executeTakeFirstOrThrow(() => HTTPError.notFound(`Product with ${key}: ${param} not found`));
    }
}