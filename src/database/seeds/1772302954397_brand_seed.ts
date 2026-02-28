import { sql, type Kysely } from 'kysely';
import { IDatabase } from '../../boot/database/schemas/index.schema';
import { brandSeedData } from './data/brand.seed.data';

export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE brands RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('brands').values(brandSeedData).execute();
}
