import { Kysely, Migrator } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import db, { migrator } from "@/boot/database/db.kysely.js";
import logger from "@/boot/loggers/logger.js";


async function toLatest(db: Kysely<IDatabase>, migrator: Migrator) {
    try {
        const { error, results } = await migrator.migrateToLatest();

        results?.forEach((it) => {
            if (it.status === 'Success') {
                logger.info(`migration "${it.migrationName}" was executed successfully`);
            } else if (it.status === 'Error') {
                logger.error(`failed to execute migration "${it.migrationName}"`);
            }
        });
        if (error) {
            throw error;
        }
    }
    finally {
        await db.destroy();
        logger.info('migration connection destroyed');
    }
}

toLatest(db, migrator).catch((error) => {
    logger.error('failed to migrate');
    logger.error(error);
    process.exit(1);
});