import { TInsertBrand } from "../../../boot/database/schemas/brand.schema";
import slugify from "../../../boot/utils/slugify";

export const brandTitles = [
    'Samsung', 'Apple', 'OnePlus', 'Google', 'Xiaomi',
    'FiiO', 'Simgot', 'KZ', 'TRN', 'Sony',
    'JBL', 'Beats', 'Lenovo', 'Huawei', 'Garmin',
    'Amazfit'
];

export const brandSeedData: TInsertBrand[] = brandTitles.map(b => ({ title: b, slug: slugify(b) }));