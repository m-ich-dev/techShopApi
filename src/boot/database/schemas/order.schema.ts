import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IOrderTable {
    id: Generated<number>;
    userId: string;
    orderStatusId: number;
    totalPrice: number;
    shippingAddress: string;
    paymentMethod: string;
    createdAt: ColumnType<Date, never, never>;
    updatedAt: ColumnType<Date, never, never>;
}

export type TRecordOrder = Selectable<IOrderTable>;
export type TInsertOrder = Insertable<IOrderTable>;
export type TUpdateOrder = Updateable<IOrderTable>;