import { sql, type Kysely } from 'kysely';
import { IDatabase } from '../../boot/database/schemas/index.schema';
import { attributeSeedData } from './data/attribute.seed.data';

export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE attributes RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('attributes').values(attributeSeedData).execute();
}
