import { Kysely, CamelCasePlugin, Migrator } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { dialect, fsProvider } from '@/boot/database/kysely.conf.js';


const db = new Kysely<IDatabase>({
    dialect,
    plugins: [new CamelCasePlugin()]
});

export const migrator = new Migrator({
    db,
    provider: fsProvider
});

export default db;