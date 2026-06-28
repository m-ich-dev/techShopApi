import { Kysely, CamelCasePlugin } from 'kysely';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import { dialect } from '@/boot/database/kysely.conf.js';


const db = new Kysely<IDatabase>({
    dialect,
    plugins: [new CamelCasePlugin()]
});

export default db;