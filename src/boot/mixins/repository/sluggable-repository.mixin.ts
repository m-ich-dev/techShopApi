import { Kysely } from "kysely";
import { IDatabase } from "../../database/schemas/index.schema";
import { AbstractConstructor, IMixinRepository } from "../../types/mixin.types";


export function Sluggable<TBase extends AbstractConstructor<IMixinRepository>>(Base: TBase) {
  abstract class SluggableRepository extends Base {

    protected abstract readonly db: Kysely<IDatabase>;
    public abstract readonly tableName: keyof IDatabase;

    async lastSlugIndex(baseSlug: string): Promise<number | null> {

      const row = await this.db
        .selectFrom(this.tableName)
        .select('slug')
        .where('slug', 'like', `${baseSlug}%`)
        .orderBy('slug', 'desc')
        .limit(1)
        .executeTakeFirst();

      if (!row) return null;

      if (row.slug === baseSlug) return 0;

      const suffix = row.slug.slice(baseSlug.length + 1);

      const num = Number(suffix);

      return Number.isNaN(num) ? 0 : num;
    }

  }
  return SluggableRepository;
}