import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import type { Requestable } from "@/boot/types/db.types.js";


export interface IAttributeTable {
    id: Generated<number>;
    title: string;
    slug: string;
    filterType: string | null;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;

    deletedAt: Date | null;
}

export type TRecordAttribute = Selectable<IAttributeTable>;
export type TInsertAttribute = Insertable<IAttributeTable>;
export type TUpdateAttribute = Updateable<IAttributeTable>;
export type TRequestAttribute = Requestable<TInsertAttribute, 'slug'>;