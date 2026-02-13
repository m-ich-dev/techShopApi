import { IRecordBrand } from "../../records/brand.record";
import { IRecordCategory } from "../../records/category.record";
import { IRecordProduct, TPivotRecordProduct } from "../../records/product.record";


export type TProductCategory = {
    id: IRecordCategory['id'];
    title: IRecordCategory['title']
}
export type TProductBrand = {
    id: IRecordBrand['id'];
    title: IRecordBrand['title'];
}

export type TProduct = Omit<IRecordProduct, 'categoryId' | 'brandId'> & {
    category: TProductCategory;
    brand: TProductBrand;
};

export type TProductRow = TPivotRecordProduct;