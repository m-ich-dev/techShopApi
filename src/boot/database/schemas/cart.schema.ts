import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface ICartTable {
    id: Generated<number>;
    userId: string;
    productVariantId: number;
    quantity: number;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
}

export type TRecordCart = Selectable<ICartTable>;
export type TInsertCart = Insertable<ICartTable>;
export type TUpdateCart = Updateable<ICartTable>;