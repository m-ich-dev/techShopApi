import type { SelectQueryBuilder } from "kysely";


export type TQuery = SelectQueryBuilder<any, any, any>;
export type TBuild<Q extends TQuery> = (qb: Q) => Q;

export type TWhereParams<C, V> = { column: C, value: V, withTrash?: boolean };
export type TSelectParams = Partial<{ withTrash?: boolean }>;
export type TUpdateParams<C, V> = { column: C, value: V };
export type TDeleteParams<C, V> = { column: C, value: V };
export type TSoftDeleteParams<C, V> = { column: C, value: V };
export type TPaginateParams<Q extends TQuery = TQuery> = Partial<{ page: number, limit: number, withTrash: boolean, build?: TBuild<Q> | TBuild<Q>[] }>;
export type TPaginateMeta = {
    page: number,
    next: number,
    prev: number,
    last: number,
    first: number,
    limit: number,
    total: number
}