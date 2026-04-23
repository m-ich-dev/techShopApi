import { Kysely, SelectType } from "kysely";
import { IDatabase } from "../../boot/database/schemas/index.schema";
import HTTPError from "../../boot/http/http.error";
import Repositorty from "../../boot/repositories/repository";
import { Sluggable } from "../../boot/mixins/repository/sluggable.repository.mixin";
import { ENTITY_BY_TABLE } from "../../boot/enums/entities.enum";
import { TWhereParams } from "../../boot/types/repository.types";
import { capitalize } from "../../boot/utils/capitalize";
import { SoftDeletable } from "../../boot/mixins/repository/soft-deletable.repository.mixin";


export default class ProductRepository extends SoftDeletable(Sluggable(Repositorty<'products'>)) {
    public readonly tableName: "products" = 'products';
    public readonly softDeletable: boolean = true;

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
}