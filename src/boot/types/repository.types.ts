export type TWhereParams<T, C, V> = { tableName?: T, column: C, value: V, withTrash?: boolean };
export type TSelectParams<T> = Partial<{ tableName: T, withTrash: boolean }>;