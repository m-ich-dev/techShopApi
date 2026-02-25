import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IAttributeTable {
    id: Generated<number>;
    title: string;
    slug: string;
    filterType: string | null;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordAttribute = Selectable<IAttributeTable>;
export type TInsertAttribute = Insertable<IAttributeTable>;
export type TUpdateAttribute = Updateable<IAttributeTable>;