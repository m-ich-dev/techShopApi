export type TInsertRecord<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
