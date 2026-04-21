export type TProductPivot = {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    categoryId: number;
    brandId: number;
    categoryTitle: string;
    brandTitle: string;
};

export type TProductView = {
    id: number;
    title: string;
    category: { id: number, title: string };
    brand: { id: number, title: string };
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}