import { Pool } from 'pg';
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { IDatabase } from './schemas/index.schema';

const PORT = Number(process.env.APP_DB_PORT) ?? 5432;
const MIN = Number(process.env.APP_DB_MIN_CONS) ?? 2;
const MAX = Number(process.env.APP_DB_MAX_CONS) ?? 10;

export const dialect = new PostgresDialect({
    pool: new Pool({
        database: process.env.APP_DB_NAME,
        host: process.env.APP_DB_HOST,
        user: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASSWORD,
        port: PORT,
        min: MIN,
        max: MAX,
    })
});

const db = new Kysely<IDatabase>({
    dialect,
    plugins: [new CamelCasePlugin()]
});

export default db;