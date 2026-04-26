import { sql, type Kysely } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { categorySeedData } from '@/database/seeds/data/category.seed.data.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('categories').values(categorySeedData).execute();
}
