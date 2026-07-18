export type TBookmarkResource = {
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