import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";
import { Sluggable } from "@/boot/mixins/repository/sluggable.repository.mixin.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";


export default class CategoryRepository extends SoftDeletable(Sluggable(Repository<'categories'>)) {
    public readonly tableName: "categories" = 'categories';
    public readonly softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    public async collectDescendantSlugs(slug: string): Promise<string[]> {
        const rows = await this.db
            .withRecursive('descendantSlugs',
                (db) => db
                    .selectFrom(this.tableName)
                    .select([
                        'id',
                        'slug',
                        'parentId'
                    ])
                    .where('categories.slug', '=', slug)
                    .unionAll(
                        db.selectFrom(`${this.tableName} as child`)
                            .innerJoin('descendantSlugs as parent', 'parent.id', 'child.parentId')
                            .select(['child.id', 'child.slug', 'child.parentId'])
                    )
            )
            .selectFrom('descendantSlugs')
            .select([
                'descendantSlugs.slug',
            ])
            .execute();

        return rows.map(r => r.slug);
    }
}
