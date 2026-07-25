import type { Kysely } from 'kysely';


const tableName = 'categories';
const parentIdIdx = `idx_${tableName}_parent_id`;

export async function up(db: Kysely<any>): Promise<void> {

	await db.schema.alterTable(tableName)
		.addColumn('parent_id', 'integer', (col) =>
			col.references(`${tableName}.id`).onDelete('set null')
		)
		.execute();

	await db.schema
		.createIndex(parentIdIdx)
		.on(tableName)
		.column('parent_id')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropIndex(parentIdIdx).ifExists().execute();
	await db.schema.alterTable(tableName).dropColumn('parent_id').execute();
}
