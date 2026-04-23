import { Kysely } from "kysely";
import { IDatabase, TSluggable } from "../../database/schemas/index.schema";
import { AbstractConstructor } from "../../types/mixin.types";
import Repository from "../../repositories/repository";


export function Sluggable<
  TTable extends keyof TSluggable,
  TBase extends AbstractConstructor<Repository<TTable>>
>(Base: TBase) {
  abstract class SluggableRepository extends Base {

    protected abstract readonly db: Kysely<IDatabase>

    async lastSlugIndex(baseSlug: string): Promise<number | null> {
      const { ref } = this.db.dynamic;
      const row = await this.qr()
        .where(ref('slug'), 'like', `${baseSlug}%`)
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