import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IOrderItemTable {
    id: Generated<number>;
    orderId: number;
    productVariantId: number;
    title: string;
    quantity: number;
    price: number;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
}

export type TRecordOrderItem = Selectable<IOrderItemTable>;
export type TInsertOrderItem = Insertable<IOrderItemTable>;
export type TUpdateOrderItem = Updateable<IOrderItemTable>;