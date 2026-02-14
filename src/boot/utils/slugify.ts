import slug from "slug";

function slugy(str: string) {
    return slug(str, {
        replacement: '-',
        remove: null,
        lower: true,
        charmap: slug.charmap,
        multicharmap: slug.multicharmap,
        trim: true,
        fallback: true
    });
}

export default function slugify(str: (string | number | undefined | null)[] | string): string {
    return Array.isArray(str) ? slugy(str.filter(Boolean).map(String).join(' ')) : slugy(str);

}