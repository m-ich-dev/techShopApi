import type { Kysely } from 'kysely';
import { toHash } from '../../boot/utils/argon2.js';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import type { TInsertUser } from '@/boot/database/schemas/user.schema.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
    const pass = await toHash('12345');
    const admin: TInsertUser = {
        first_name: 'admin',
        last_name: 'admin',
        email: 'test@gmail.com',
        password_hash: pass,
        role: 1,
        is_active: true,
    };

    await db.insertInto('users').values(admin).execute();
}
