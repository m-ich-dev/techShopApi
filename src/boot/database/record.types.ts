export type TInsert<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
