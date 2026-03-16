import { IDatabase } from "../database/schemas/index.schema";

export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;

export interface IMixinRepository {
    tableName: keyof IDatabase;
}
