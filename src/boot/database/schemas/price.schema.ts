import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface IPriceTable {
    id: Generated<number>;
    productVariantId: number;
    price: number;
    oldPrice: number;
    discount: number;
    createdAt: Generated<ColumnType<Date, never, never>>;
    updatedAt: Generated<ColumnType<Date, never, never>>;

    deletedAt: Date | null;
}

export type TRecordPrice = Selectable<IPriceTable>;
export type TInsertPrice = Insertable<IPriceTable>;
export type TUpdatePrice = Updateable<IPriceTable>;