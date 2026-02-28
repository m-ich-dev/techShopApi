import { sql, type Kysely } from 'kysely';
import { IDatabase } from '../../boot/database/schemas/index.schema';
import { TInsertProductVariant } from '../../boot/database/schemas/product-variant.schema';
import { variantData } from './data/product-variant.seed.data';
import slugify from '../../boot/utils/slugify';

export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE prices RESTART IDENTITY CASCADE`.execute(db);
	await sql`TRUNCATE TABLE product_variant_attributes RESTART IDENTITY CASCADE`.execute(db);
	await sql`TRUNCATE TABLE product_variants RESTART IDENTITY CASCADE`.execute(db);

	const products = await db.selectFrom('products').selectAll().execute();
	const productMap = new Map(products.map(p => [p.title, p.id]));

	const attributes = await db.selectFrom('attributes').selectAll().execute();
	const attributeMap = new Map(attributes.map(a => [a.title, a.id]));

	const variantSeedData: TInsertProductVariant[] = variantData.map(v => ({
		parentId: productMap.get(v.title) || 999,
		currentPriceId: null,
		title: `${v.title} ${v.titlePostfix}`,
		stock: v.stock,
		slug: slugify(`${v.title} ${v.titlePostfix}`)
	}));

	await db.insertInto('productVariants').values(variantSeedData).execute();

	const variants = await db.selectFrom('productVariants').selectAll().execute();

	const variantsMap = new Map(variants.map(v => [v.title, v.id]));

	const variantAttributesSeedData: {
		productVariantId: number,
		attributeId: number, value: string
	}[] = [];

	variantData.forEach(v => {
		const variantId = variantsMap.get(`${v.title} ${v.titlePostfix}`);

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
	await db.insertInto('productVariantAttributes').values(variantAttributesSeedData).execute();
}
