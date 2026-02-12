import { IRecordBrand } from "../records/brand.record";
import { IRecordCategory } from "../records/category.record";
import { IRecordProduct, TPivotRecordProduct } from "../records/product.record";

type TProductCategory = {
    id: IRecordCategory['id'];
    title: IRecordCategory['title']
}
type TProductBrand = {
    id: IRecordBrand['id'];
    title: IRecordBrand['title'];
}
export type TProduct = Omit<IRecordProduct, 'categoryId' | 'brandId'> & {
    category: TProductCategory;
    brand: TProductBrand;
};

export default class Product implements TProduct {
    id: number;
    category: TProductCategory;
    brand: TProductBrand;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TPivotRecordProduct) {
        this.id = data.id;
        this.category = {
            id: data.categoryId,
            title: data.categoryTitle
        };
        this.brand = {
            id: data.brandId,
            title: data.brandTitle
        };
        this.title = data.title;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}