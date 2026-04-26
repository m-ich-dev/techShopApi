import type { Kysely, SelectType } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import type { TWhereParams } from "@/boot/types/repository.types.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export default class ProductRepository extends SoftDeletable(Sluggable(Repository<'products'>)) {
    public readonly tableName: "products" = 'products';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    protected queryWithPivot(withTrash: boolean) {
        const { table, ref } = this.db.dynamic;

        let query = this.db.selectFrom(table(this.tableName).as('t')).selectAll();

        if (this.softDeletable && !withTrash) {
            query = query.where(ref('t.deletedAt'), 'is', null);
        }

        return query
            .innerJoin('categories', 'categories.id', 't.categoryId')
            .innerJoin('brands', 'brands.id', 't.brandId')
            .select([
                'categories.title as categoryTitle',
                'brands.title as brandTitle'
            ]);
    }
    public allPivot(
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
}