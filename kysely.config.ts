import { PostgresDialect } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';

export default defineConfig({
	dialect: new PostgresDialect({
		pool: new Pool({
			database: process.env.APP_DB_NAME,
			host: process.env.APP_DB_HOST,
			user: process.env.APP_DB_USER,
			password: process.env.APP_DB_PASSWORD,
			port: Number(process.env.APP_DB_PORT) || 5432,
		}),
	}),
	migrations: {
		migrationFolder: "src/database/migrations",
	},
	seeds: {
		seedFolder: "src/database/seeds",
	}
});
