import { ColumnType } from "kysely";

type TProductPivot = {
    id: number;
    title: string;
    slug: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>
    deletedAt: Date | null;
    categoryId: number;
    brandId: number;
    categoryTitle: string;
    brandTitle: string;
};

type TVariantPivot = {
    currentPriceId: number | null;
    id: number;
    title: string;
    slug: string;
    createdAt: ColumnType<Date, never, never>
    updatedAt: ColumnType<Date, never, never>
    deletedAt: Date | null;
    parentId: number;
    stock: number;
    price: {
        id: number;
        price: number;
        oldPrice: number;
        discount: number;
    } | null;
    attributes: {
        id: number;
        title: string;
        value: string;
    }[];
}

type TMasterProduct = Omit<TProductPivot, 'categoryId' | 'categoryTitle' | 'brandId' | 'brandTitle'> & {
    category: { id: number; title: string };
    brand: { id: number; title: string };
    variants: Omit<TVariantPivot, 'currentPriceId'>[];
};

export default class MasterProduct implements TMasterProduct {
    id: number;
    category: { id: number; title: string };
    brand: { id: number; title: string };
    title: string;
    slug: string;

    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
    deletedAt: Date | null;

    variants: TMasterProduct['variants'];

    constructor(data: { product: TProductPivot, variants: TVariantPivot[] }) {
        this.id = data.product.id;
        this.title = data.product.title;
        this.category = { id: data.product.categoryId, title: data.product.categoryTitle };
        this.brand = { id: data.product.brandId, title: data.product.brandTitle };
        this.slug = data.product.slug;
        this.createdAt = data.product.createdAt;
        this.updatedAt = data.product.updatedAt;
        this.deletedAt = data.product.deletedAt;
        this.variants = data.variants;
    }
}