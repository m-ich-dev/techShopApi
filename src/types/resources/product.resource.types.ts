export type TProductCatalogResource = {
    id: number;
    title: string;
    slug: string;
    stock: number;
    brand: {
        title: string;
        slug: string;
    };
    category: {
        title: string;
        slug: string;
    };
    price: {
        current: number;
        old: number | null;
        discountPercent: number | null;
    } | null;
};

export type TProductShowResource = TProductCatalogResource & {
    attributes: {
        title: string;
        value: string;
    }[];
};