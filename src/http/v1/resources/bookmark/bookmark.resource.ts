import Resource from "@/boot/http/resource.js";
import type { TBookmarkResource } from "@/types/resources/bookmark.resource.types.js";


type TBookmarkInput = {
    id: number;
    variant: {
        id: number;
        title: string;
        slug: string;
        stock: number;
        price: {
            current: number;
            old: number | null;
        } | null;
    } | null;
};


export default class BookmarkResource extends Resource {
    public static override transform(data: TBookmarkInput): TBookmarkResource {
        return {
            id: data.id,
            variant: data.variant
        };
    }
}