import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IPriceTable {
    id: Generated<number>;
    productVariantId: number;
    price: number;
    oldPrice: number | null;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
    deletedAt: Date | null;
}

export type TRecordPrice = Selectable<IPriceTable>;
export type TInsertPrice = Insertable<IPriceTable>;
export type TUpdatePrice = Updateable<IPriceTable>;