import type { TQuery } from "@/boot/types/repository.types.js";
import type { TVariantPivotQuery } from "@/repositories/product-variant/product-variant.repository.js";
import type { TCatalogFilters } from "@/types/filters/catalog-filter.types.js";


export default class CatalogFilter {
    constructor(
        private readonly filters: TCatalogFilters,
        private readonly categorySlugs?: string[]
    ) { }

    public apply(qb: TQuery<TVariantPivotQuery>) {
        let q = qb;

        if (this.filters.brand) {
            q = q.where('brands.slug', '=', this.filters.brand);
        }
        if (this.categorySlugs && this.categorySlugs.length > 0) {
            q = q.where('categories.slug', 'in', this.categorySlugs);
        }
        if (this.filters.minPrice || this.filters.maxPrice) {
            const min = this.filters.minPrice ? this.filters.minPrice : null;
            const max = this.filters.maxPrice ? this.filters.maxPrice : null;

            q = q.where((eb) => eb.exists(
                eb
                    .selectFrom('prices')
                    .select('prices.id')
                    .whereRef('prices.id', '=', 't.currentPriceId')
                    .$if(min !== null, (qb) => qb.where('prices.price', '>=', min!))
                    .$if(max !== null, (qb) => qb.where('prices.price', '<=', max!))
            ));
        }
        if (!this.filters.attributes) {
            this.filters.attributes = {};
        }
        for (const [slug, value] of Object.entries(this.filters.attributes)) {
            q = q.where((eb) =>
                eb.exists(
                    eb
                        .selectFrom(
                            'productVariantAttributes as pva'
                        )
                        .innerJoin(
                            'attributes as a',
                            'a.id',
                            'pva.attributeId'
                        )
                        .select('pva.attributeId')
                        .whereRef(
                            'pva.productVariantId',
                            '=',
                            't.id'
                        )
                        .where(
                            'a.slug',
                            '=',
                            slug
                        )
                        .$if(
                            Array.isArray(value),
                            qb => qb.where(
                                'pva.value',
                                'in',
                                value
                            )
                        )
                        .$if(
                            !Array.isArray(value),
                            qb => qb.where(
                                'pva.value',
                                '=',
                                value
                            )
                        )

                )
            );
        }


        return q;
    }
}