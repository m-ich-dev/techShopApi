import { Knex } from "knex";
import { IRecordCategory } from "../../records/category.record";
import { IRecordBrand } from "../../records/brand.record";
import { TInsertProduct } from "../../records/product.record";
import { productData } from "./data/product.seed.data";
import slugify from "../../boot/utils/slugify";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Deletes ALL existing entries
    await knex("products").truncate();

    const categories: IRecordCategory[] = await knex('categories');
    const brands: IRecordBrand[] = await knex('brands');
    const categoryMap = new Map(categories.map(c => [c.title, c.id]));
    const brandMap = new Map(brands.map(b => [b.title, b.id]));

    const productSeedData: TInsertProduct[] = productData.map(p => ({
        title: p.title,
        categoryId: categoryMap.get(p.categoryTitle) || 999,
        brandId: brandMap.get(p.brandTitle) || 999,
        slug: slugify(p.title)
    }));
    // Inserts seed entries
    await knex("products").insert(productSeedData);

    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');

};
