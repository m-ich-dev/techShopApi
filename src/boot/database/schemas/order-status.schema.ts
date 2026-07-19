import type { Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IOrderStatusTable {
    id: Generated<number>;
    title: string;
    description: string | null;
}

export type TRecordOrderStatus = Selectable<IOrderStatusTable>;
export type TInsertOrderStatus = Insertable<IOrderStatusTable>;
export type TUpdateOrderStatus = Updateable<IOrderStatusTable>;