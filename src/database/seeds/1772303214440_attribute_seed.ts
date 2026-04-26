import { sql, type Kysely } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { attributeSeedData } from '@/database/seeds/data/attribute.seed.data.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE attributes RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('attributes').values(attributeSeedData).execute();
}
