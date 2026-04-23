export type TWhereParams<C, V> = { column: C, value: V, withTrash?: boolean };
export type TSelectParams = Partial<{ withTrash?: boolean }>;
export type TUpdateParams<C, V> = { column: C, value: V };
export type TDeleteParams<C, V> = { column: C, value: V };
export type TSoftDeleteParams<C, V> = { column: C, value: V };