import { Kysely, sql } from "kysely";


export const updatedAtTrigger = {
    func: (db: Kysely<any>) => {
        return sql`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ LANGUAGE 'plpgsql';
    `.execute(db);
    },
    dropFunc: (db: Kysely<any>) => sql`DROP FUNCTION IF EXISTS update_updated_at_column()`.execute(db),
    createTrigger: (db: Kysely<any>, tableName: string) => {
        return sql`
        CREATE TRIGGER ${sql.raw(tableName + '_updated_at')} 
            BEFORE UPDATE ON ${sql.raw(tableName)}
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
    `.execute(db);
    },
    dropTrigger: (db: Kysely<any>, tableName: string) => sql`DROP TRIGGER IF EXISTS ${sql.raw(tableName + '_updated_at')} ON ${sql.raw(tableName)}`.execute(db)
};