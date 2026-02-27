import type { Kysely } from 'kysely';
import { updatedAtTrigger } from './triggers/updated-at.trigger';

export async function up(db: Kysely<any>): Promise<void> {
	await updatedAtTrigger.func(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await updatedAtTrigger.dropFunc(db);
}
