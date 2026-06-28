import type { Kysely, Migrator } from "kysely";
import type { IDatabase } from "../schemas/index.schema.js";
import db, { migrator } from "@/boot/database/db.kysely.js";
import logger from "@/boot/loggers/logger.js";


export async function rollback(db: Kysely<IDatabase>, migrator: Migrator) {
    try {
        const { error, results } = await migrator.migrateDown();

        results?.forEach((it) => {
            if (it.status === 'Success') {
                logger.info(`migration "${it.migrationName}" was rolled back successfully`);
            } else if (it.status === 'Error') {
                logger.error(`failed to rollback migration "${it.migrationName}"`);
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

rollback(db, migrator).catch((error) => {
    logger.error('failed to rollback');
    logger.error(error);
    process.exit(1);
});