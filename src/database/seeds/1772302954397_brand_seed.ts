import { sql, type Kysely } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { brandSeedData } from '@/database/seeds/data/brand.seed.data.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE brands RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('brands').values(brandSeedData).execute();
}
