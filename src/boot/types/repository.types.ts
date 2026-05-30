import type { SelectQueryBuilder } from "kysely";


export type TQuery = SelectQueryBuilder<any, any, any>;
export type TBuild = (qb: TQuery) => TQuery;
export type TWhereParams<C, V> = { column: C, value: V, withTrash?: boolean };
export type TSelectParams = Partial<{ withTrash?: boolean }>;
export type TUpdateParams<C, V> = { column: C, value: V };
export type TDeleteParams<C, V> = { column: C, value: V };
export type TSoftDeleteParams<C, V> = { column: C, value: V };
export type TPaginateParams = Partial<{ page: number, limit: number, withTrash: boolean, build?: TBuild | TBuild[] }>;
export type TPaginateMeta = {
    page: number,
    next: number,
    prev: number,
    last: number,
    first: number,
    limit: number,
    total: number
}