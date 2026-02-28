import { sql, type Kysely } from 'kysely';
import { IDatabase } from '../../boot/database/schemas/index.schema.ts';
import { categorySeedData } from './data/category.seed.data.ts';

export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('categories').values(categorySeedData).execute();
}
