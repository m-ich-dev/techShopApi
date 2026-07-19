import { sql, type Kysely } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { orderStatusSeedData } from '../seeds/data/order-status.seed.data.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
	await sql`TRUNCATE TABLE order_statuses RESTART IDENTITY CASCADE`.execute(db);

	await db.insertInto('orderStatuses').values(orderStatusSeedData).execute();
}