import { Knex } from "knex";
import { IRecordProduct } from "../../records/product.record";
import { IRecordProductVariant, TInsertProductVariant } from "../../records/product-variant.record";
import { variantData } from "./data/product-variant.seed.data";
import slugify from "../../boot/utils/slugify";
import { IRecordAttribute } from "../../records/attribute.record";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Deletes ALL existing entries
    await knex("prices").truncate();
    await knex("product_variant_attributes").truncate();
    await knex("product_variants").truncate();

    const products: IRecordProduct[] = await knex('products');
    const productMap = new Map(products.map(p => [p.title, p.id]));

    const attributes: IRecordAttribute[] = await knex('attributes');
    const attributeMap = new Map(attributes.map(a => [a.title, a.id]));

    const variantSeedData: TInsertProductVariant[] = variantData.map(v => ({
        parentId: productMap.get(v.title) || 999,
        currentPriceId: null,
        title: `${v.title} ${v.titlePostfix}`,
        stock: v.stock,
        slug: slugify(`${v.title} ${v.titlePostfix}`)
    }));

    // Inserts seed entries
    await knex("product_variants").insert(variantSeedData);

    const variants: IRecordProductVariant[] = await knex('product_variants');
    const variantMap = new Map(variants.map(v => [v.title, v.id]));

    const variantAttributesSeedData: {
        productVariantId: number,
        attributeId: number, value: string
    }[] = [];

    variantData.forEach(v => {
        const variantId = variantMap.get(`${v.title} ${v.titlePostfix}`);

        for (const [attrTitle, value] of Object.entries(v.attributes)) {
            const attrId = attributeMap.get(attrTitle);
            if (attrId) {
                variantAttributesSeedData.push({
                    productVariantId: variantId || 999,
                    attributeId: attrId,
                    value: String(value)
                });
            }
        };

    });
    await knex('product_variant_attributes').insert(variantAttributesSeedData);
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

};
