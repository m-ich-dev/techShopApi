import type { Kysely } from 'kysely';
import updatedAtTrigger from '../migrations/triggers/updated-at.trigger.js';


export async function up(db: Kysely<any>): Promise<void> {
	await updatedAtTrigger.func(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await updatedAtTrigger.dropFunc(db);
}
