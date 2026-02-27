import { defineConfig } from 'kysely-ctl';
import db from './src/boot/database/db.kysely';

export default defineConfig({
	db: db,
	migrations: {
		migrationFolder: "src/database/migrations",
	},
	seeds: {
		seedFolder: "src/database/seeds",
	}
});
