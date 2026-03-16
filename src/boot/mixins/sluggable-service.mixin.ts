import { AbstractConstructor } from "../types/mixin.types";
import slugify from "../utils/slugify";

interface SlugRepository {
    lastSlugIndex(baseSlug: string): Promise<number | null>;
}

export function GenerateSlug<TBase extends AbstractConstructor>(Base: TBase) {

    abstract class SluggableService extends Base {

        protected async generateSlug(
            repository: SlugRepository,
            fields: (string | number | null | undefined)[] | string
        ): Promise<string> {

            const baseSlug = slugify(fields);

            const lastIndex = await repository.lastSlugIndex(baseSlug);

            if (lastIndex === null) {
                return baseSlug;
            }

            return `${baseSlug}-${lastIndex + 1}`;
        }
    }

    return SluggableService;
}