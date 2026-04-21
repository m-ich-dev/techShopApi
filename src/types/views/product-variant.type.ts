export type TVariantPivot = {
    id: number;
    parentId: number;
    currentPriceId: number | null;
    title: string;
    stock: number;
    slug: string;
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null;
    price: {
        id: number;
        current: number;
        old: number | null;
    } | null;
    attributes: {
        id: number;
        title: string;
        value: string;
    }[];
}

export type TVariantView = {
    id: number;
    parentId: number;
    title: string;
    stock: number;
    slug: string;
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null;
    price: {
        id: number;
        current: number;
        old: number | null;
        discount: number | null;
    } | null;
    attributes: {
        id: number;
        title: string;
        value: string;
    }[];
}