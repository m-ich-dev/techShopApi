export type Timestamps = 'createdAt' | 'updatedAt' | 'deletedAt';
export type TInsertRecord<T> = Omit<T, 'id' | Timestamps>;
export type TOmitTimestamps<T> = Omit<T, Timestamps>;