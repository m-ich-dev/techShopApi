import Repository from "@/boot/repositories/repository.js";
import { SoftDeletable } from "@/boot/mixins/repository/soft-deletable.repository.mixin.js";
import type { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";


export default class UserRepository extends SoftDeletable(Repository<'users'>) {
    public tableName: "users" = 'users';
    public softDeletable: boolean = true;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }

    public firstByEmail({ email, withTrash = false }: { email: string, withTrash?: boolean }) {
        return this.qr(withTrash).selectAll().where('t.email', '=', email).executeTakeFirst();
    }
}