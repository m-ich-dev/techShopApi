import { sql, type Kysely } from 'kysely';
import updatedAtTrigger from '../migrations/triggers/updated-at.trigger.js';


const tableName = 'users';
const emailIdx = `idx_${tableName}_email`;

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable(tableName)
		.addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`).notNull())
		.addColumn('first_name', 'varchar', (col) => col.notNull())
		.addColumn('last_name', 'varchar', (col) => col.notNull())
		.addColumn('email', 'varchar', (col) => col.notNull().unique())
		.addColumn('password_hash', 'varchar', (col) => col.notNull())
		.addColumn('role', 'smallint', (col) => col.notNull())
		.addColumn('is_active', 'boolean', (col) => col.defaultTo(true))
		.addColumn('create_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
		.addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
		.addColumn('deleted_at', 'timestamptz')
		.ifNotExists()
		.execute();

	await db.schema.createIndex(emailIdx)
		.on(tableName)
		.column('email')
		.execute();

	await updatedAtTrigger.createTrigger(db, tableName);

}


export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropIndex(emailIdx).ifExists().execute();
	await updatedAtTrigger.dropTrigger(db, tableName);
	await db.schema.dropTable(tableName).ifExists().execute();
}
