import type { Kysely, SelectType } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";
import HTTPError from "@/boot/http/http.error.js";
import { ENTITY_BY_TABLE } from "@/boot/enums/entities.enum.js";
import type { TPaginateMeta, TPaginateParams, TWhereParams } from "@/boot/types/repository.types.js";
import { capitalize } from "@/boot/utils/capitalize.js";


export type TVariantPivotQuery = ReturnType<ProductVariantRepository['queryWithPivot']>;

export default class ProductVariantRepository extends SoftDeletable(Sluggable(Repository<'productVariants'>)) {
    public readonly tableName: "productVariants" = 'productVariants';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    private queryWithPivot(withTrash: boolean, withAttrs: boolean) {

        const baseQ = this.db
            .selectFrom(`${this.tableName} as t`)
            .$if(this.softDeletable && !withTrash, (qb) => qb.where('t.deletedAt', 'is', null));

        return baseQ
            .innerJoin('products', 'products.id', 't.parentId')
            .innerJoin('brands', 'brands.id', 'products.brandId')
            .innerJoin('categories', 'categories.id', 'products.categoryId')
            .select([
                't.id',
                't.title',
                't.parentId',
                't.slug',
                't.stock',
                't.createdAt',
                't.updatedAt',
                't.deletedAt',

                'brands.title as brandTitle',
                'brands.slug as brandSlug',
                'categories.title as categoryTitle',
                'categories.slug as categorySlug'
            ])
            .select((eb) => [
                jsonObjectFrom(
                    eb.selectFrom('prices')
                        .select(['prices.id', 'prices.price as current', 'prices.oldPrice as old'])
                        .whereRef('prices.id', '=', 't.currentPriceId')
                ).as('price'),


            ])
            .$if(withAttrs, (qb) => qb.select((eb) => [jsonArrayFrom(
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
            ).as('attributes')]))
            ;
    }

    public async paginatePivot({
        page = 1,
        limit = 15,
        withTrash = false,
        build
    }: TPaginateParams<TVariantPivotQuery>) {

        const pageLimit = Math.min(limit, 100);
        const offset = (page - 1) * pageLimit;
        const baseQuery = this.applyBuild(
            this.queryWithPivot(withTrash, false),
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

    public async allPivot(
        { withTrash = false }: { withTrash?: boolean }
    ) {
        return await this.queryWithPivot(withTrash, true).execute();
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

        const qr = this.queryWithPivot(withTrash, true);

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

        const qr = this.queryWithPivot(withTrash, true);

        return await qr
            .where(ref(`t.${column}`), '=', value)
            .orderBy('t.id')
            .execute();
    }
    // public async findBatchByParent(parentId: number) {
    //     return this.queryWithPivot()
    //         .where('productVariants.parentId', '=', parentId)
    //         .execute();
    // }

}