import Repository from "@/boot/repositories/repository.js";
import type { TSluggable } from "@/boot/database/schemas/index.schema.js";
import type { AbstractConstructor } from "@/boot/types/mixin.types.js";


export function Sluggable<
  TTable extends keyof TSluggable,
  TBase extends AbstractConstructor<Repository<TTable>>
>(
  Base: TBase
) {

  abstract class SluggableRepository extends Base {

    async lastSlugIndex(
      baseSlug: string
    ): Promise<number | null> {
      const { ref, table } = this.db.dynamic;

      const row = await this.db.selectFrom(table(this.tableName).as('t')).select('t.slug')
        .where(ref('t.slug'), 'like', `${baseSlug}%`)
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
  return SluggableRepository as unknown as TBase & {
    new(...args: any[]): {
      lastSlugIndex(baseSlug: string): Promise<number | null>
    }
  };
}