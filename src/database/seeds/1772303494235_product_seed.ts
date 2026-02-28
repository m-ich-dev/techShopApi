import { sql, type Kysely } from 'kysely';
import { IDatabase } from '../../boot/database/schemas/index.schema';
import { TInsertProduct } from '../../boot/database/schemas/product.schema';
import { productData } from './data/product.seed.data';
import slugify from '../../boot/utils/slugify';

export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`.execute(db);

	const categories = await db.selectFrom('categories').selectAll().execute();
	const brands = await db.selectFrom('brands').selectAll().execute();

	const categoryMap = new Map(categories.map(c => [c.title, c.id]));
	const brandMap = new Map(brands.map(b => [b.title, b.id]));

	const productSeedData: TInsertProduct[] = productData.map(p => ({
		title: p.title,
		categoryId: categoryMap.get(p.categoryTitle) || 999,
		brandId: brandMap.get(p.brandTitle) || 999,
		slug: slugify(p.title)
	}));

	await db.insertInto('products').values(productSeedData).execute();
}
