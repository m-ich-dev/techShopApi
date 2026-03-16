export type TWhereParams<T, C, V> = { tableName?: T, column: C, value: V, withTrash?: boolean };
export type TSelectParams<T> = Partial<{ tableName: T, withTrash: boolean }>;
export type TUpdateParams<T, C, V> = { tableName?: T, column: C, value: V };
export type TDeleteParams<T, C, V> = { tableName?: T, column: C, value: V };
export type TSoftDeleteParams<C, V> = { column: C, value: V };