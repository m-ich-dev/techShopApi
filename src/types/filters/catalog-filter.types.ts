export type TCatalogFilters = {
    brand?: string;
    category?: string;

    minPrice?: number;
    maxPrice?: number;

    attributes?: Record<
        string,
        string | string[]
    >;
}; 