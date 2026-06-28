import { PostgresDialect } from "kysely";
import { Pool, type PoolConfig } from "pg";


const PORT = Number(process.env.APP_DB_PORT) || 5432;
const MIN = Number(process.env.APP_DB_MIN_CONS) || 2;
const MAX = Number(process.env.APP_DB_MAX_CONS) || 10;

const pgConnection: PoolConfig = {
    database: process.env.APP_DB_NAME,
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    port: PORT,
    min: MIN,
    max: MAX,
};

export const dialect = new PostgresDialect({
    pool: new Pool(pgConnection)
});