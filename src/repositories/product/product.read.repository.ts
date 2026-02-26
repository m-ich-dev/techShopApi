import { Kysely, SelectType } from "kysely";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import HTTPError from "../../boot/http/http.error";
import ReadRepositorty from "../../boot/repositories/read.repository";
import { TWhereType } from "../../boot/types/db.types";
import { ENTITY_BY_TABLE } from "../../boot/enums/entities.enum";



export default class ProductReadRepository extends ReadRepositorty<'products'> {
    public readonly tableName: "products" = 'products';
    public readonly softDelete: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }


    protected queryWithPivot<T extends typeof this.tableName>(tableName: T, withTrash: boolean) {
        return this.qr(tableName, withTrash)
            .innerJoin('categories', 'categories.id', 't.categoryId')
            .innerJoin('brands', 'brands.id', 't.brandId')
            .select([
                'categories.title as categoryTitle',
                'brands.title as brandTitle'
            ]);
    }
    public allPivot(
        { withTrash = false }:
            { withTrash?: boolean }
    ) {
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
}