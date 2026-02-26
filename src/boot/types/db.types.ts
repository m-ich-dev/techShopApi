export type Timestamps = 'createdAt' | 'updatedAt' | 'deletedAt';
export type TInsertRecord<T> = Omit<T, 'id' | Timestamps>;
export type TOmitTimestamps<T> = Omit<T, Timestamps>;

export type TWhereType<T, C, V> = { tableName?: T, column: C, value: V, withTrash?: boolean };
export type TSelectType<T> = Partial<{ tableName: T, withTrash: boolean }>;