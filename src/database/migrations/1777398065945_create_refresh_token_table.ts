import { sql, type Kysely } from 'kysely';


const tableName = 'refresh_tokens';
const tokenIdx = `idx_${tableName}_token_hash`;

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable(tableName)
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('user_id', 'uuid', (col) => col.references('users.id').notNull().onUpdate('cascade').onDelete('cascade'))
		.addColumn('token_hash', 'varchar', (col) => col.notNull())
		.addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
		.addColumn('expires_at', 'timestamptz', (col) => col.notNull())
		.addColumn('revoked_at', 'timestamptz')
		.addColumn('user_agent', 'varchar', (col) => col.notNull())
		.addColumn('ip', 'varchar', (col) => col.notNull())
		.ifNotExists()
		.execute();

	await db.schema.createIndex(tokenIdx)
		.on(tableName)
		.column('token_hash')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropIndex(tokenIdx).ifExists().execute();
	await db.schema.dropTable(tableName).ifExists().execute();
}
