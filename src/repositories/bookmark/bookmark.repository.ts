import { Kysely } from "kysely";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import Repository from "@/boot/repositories/repository.js";


export default class BookmarkRepository extends Repository<'bookmarks'> {
    public readonly tableName: "bookmarks" = 'bookmarks';
    public readonly softDeletable: boolean = false;

    constructor(protected readonly db: Kysely<IDatabase>) { super(); }
}