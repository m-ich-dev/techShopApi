import type { Kysely, SelectType } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import type { TPaginateMeta, TPaginateParams, TWhereParams } from "@/boot/types/repository.types.js";
import { capitalize } from "@/boot/utils/capitalize.js";

type ProductPivotQuery = ReturnType<ProductRepository['queryWithPivot']>;

export default class ProductRepository extends SoftDeletable(Sluggable(Repository<'products'>)) {
    public readonly tableName: "products" = 'products';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    protected queryWithPivot(withTrash: boolean) {

        const baseQ = this.db
            .selectFrom(`${this.tableName} as t`)
            .selectAll('t')
            .$if(this.softDeletable && !withTrash, (qb) => qb.where('t.deletedAt', 'is', null));

        return baseQ
            .innerJoin('categories', 'categories.id', 't.categoryId')
            .innerJoin('brands', 'brands.id', 't.brandId')
            .select([
                'categories.title as categoryTitle',
                'brands.title as brandTitle'
            ]);
    }

    public async allPivot(
        { withTrash = false }: { withTrash?: boolean }
    ) {
        return await this.queryWithPivot(withTrash).execute();
    }

    public async paginatePivot({
        page = 1,
        limit = 15,
        withTrash = false,
        build
    }: TPaginateParams<ProductPivotQuery>) {

        const pageLimit = Math.min(limit, 100);
        const offset = (page - 1) * pageLimit;
        const baseQuery = this.applyBuild(
            this.queryWithPivot(withTrash),
            build
        );

        const dataQuery = baseQuery
            .offset(offset)
            .limit(pageLimit)
            .orderBy('t.createdAt', 'desc')
            .orderBy('t.id', 'asc');

        const countQuery = baseQuery
            .clearSelect()
            .clearLimit()
            .clearOffset()
            .select((eb) => eb.fn.countAll().as('total'));

        const [data, count] = await Promise.all([
            dataQuery.execute(),
            countQuery.executeTakeFirst()
        ]);

        const totalRecords = Number(count?.total ?? 0);
        const totalPages = Math.max(1, Math.ceil(totalRecords / pageLimit)
        );

        const next = page < totalPages ? page + 1 : totalPages;
        const prev = page > 1 ? page - 1 : 1;

        const meta: TPaginateMeta = {
            page,
            next,
            prev,
            first: 1,
            last: totalPages,
            limit: pageLimit,
            total: totalRecords
        };

        return {
            data,
            meta
        };
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