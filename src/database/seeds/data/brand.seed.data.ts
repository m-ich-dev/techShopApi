import slugify from "../../../boot/utils/slugify";
import { TInsertBrand } from "../../../records/brand.record";

export const brandTitles = [
    'Samsung', 'Apple', 'OnePlus', 'Google', 'Xiaomi',
    'FiiO', 'Simgot', 'KZ', 'TRN', 'Sony',
    'JBL', 'Beats', 'Lenovo', 'Huawei', 'Garmin',
    'Amazfit'
];

export const brandSeedData: TInsertBrand[] = brandTitles.map(b => ({ title: b, slug: slugify(b) }));