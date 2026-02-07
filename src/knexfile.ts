import type { Knex } from "knex";
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { toCamelSnake, strToSnake } from "./boot/utils/camel-snake";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

type EnvConfig = 'development' | 'production';

const env = (process.env.NODE_ENV || 'development') as EnvConfig;

const PORT = Number(process.env.APP_DB_PORT);

const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.APP_DB_HOST ?? '127.0.0.1',
            port: PORT ?? 3306,
            user: process.env.APP_DB_USER ?? 'user',
            password: process.env.APP_DB_PASSWORD ?? '',
            database: process.env.APP_DB_NAME ?? 'db',
        },
        pool: {
            min: 0, max: 10,
            propagateCreateError: false
        },
        postProcessResponse: (result) => {
            return toCamelSnake(result, 'camel');
        },
        wrapIdentifier: (value, origImpl) => {
            return origImpl(strToSnake(value));
        },
        migrations: {
            tableName: 'knex_tables',
            directory: './database/migrations',
            extension: 'ts',
            loadExtensions: ['.ts']
        },
        seeds: {
            directory: './database/seeds',
            extension: 'ts',
            loadExtensions: ['.ts']
        },
        compileSqlOnError: false,
    },

    production: {
        client: "mysql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }

} satisfies Record<string, Knex.Config>;;

export const dbConfig = config[env];

export default config;
