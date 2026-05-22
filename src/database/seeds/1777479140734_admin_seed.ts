import type { Kysely } from 'kysely';
import { toHash } from '../../boot/utils/argon2.js';
import type { IDatabase } from '@/boot/database/schemas/index.schema.js';
import type { TInsertUser } from '@/boot/database/schemas/user.schema.js';


export async function seed(db: Kysely<IDatabase>): Promise<void> {
    const pass = await toHash('12345');
    const admin: TInsertUser = {
        firstName: 'admin',
        lastName: 'admin',
        email: 'test@gmail.com',
        passwordHash: pass,
        role: 1,
        isActive: true,
    };

    await db.insertInto('users').values(admin).execute();
}
