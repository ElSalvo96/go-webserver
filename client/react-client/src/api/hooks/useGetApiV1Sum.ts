import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1SumQueryResponse, GetApiV1SumQueryParams, GetApiV1Sum400 } from "../types/GetApiV1Sum";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1SumClient = typeof client<GetApiV1SumQueryResponse, GetApiV1Sum400, never>;
type GetApiV1Sum = {
    data: GetApiV1SumQueryResponse;
    error: GetApiV1Sum400;
    request: never;
    pathParams: never;
    queryParams: GetApiV1SumQueryParams;
    headerParams: never;
    response: GetApiV1SumQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1SumClient>[0]>;
        return: Awaited<ReturnType<GetApiV1SumClient>>;
    };
};
export const getApiV1SumQueryKey = (params: GetApiV1Sum["queryParams"]) => [{ url: "/api/v1/sum" }, ...(params ? [params] : [])] as const;
export type GetApiV1SumQueryKey = ReturnType<typeof getApiV1SumQueryKey>;
export function getApiV1SumQueryOptions(params: GetApiV1Sum["queryParams"], options: GetApiV1Sum["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1Sum["data"], GetApiV1Sum["error"]>({
                method: "get",
                url: `/api/v1/sum`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle the sum service using the query string
 * @summary Handle the sum service using the query string
 * @link /api/v1/sum
 */
export function useGetApiV1Sum<TData = GetApiV1Sum["response"], TQueryData = GetApiV1Sum["response"], TQueryKey extends QueryKey = GetApiV1SumQueryKey>(params: GetApiV1Sum["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetApiV1Sum["response"], GetApiV1Sum["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1Sum["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1Sum["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumQueryKey(params);
    const query = useQuery({
        ...getApiV1SumQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1Sum["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1SumSuspenseQueryKey = (params: GetApiV1Sum["queryParams"]) => [{ url: "/api/v1/sum" }, ...(params ? [params] : [])] as const;
export type GetApiV1SumSuspenseQueryKey = ReturnType<typeof getApiV1SumSuspenseQueryKey>;
export function getApiV1SumSuspenseQueryOptions(params: GetApiV1Sum["queryParams"], options: GetApiV1Sum["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1Sum["data"], GetApiV1Sum["error"]>({
                method: "get",
                url: `/api/v1/sum`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle the sum service using the query string
 * @summary Handle the sum service using the query string
 * @link /api/v1/sum
 */
export function useGetApiV1SumSuspense<TData = GetApiV1Sum["response"], TQueryKey extends QueryKey = GetApiV1SumSuspenseQueryKey>(params: GetApiV1Sum["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1Sum["response"], GetApiV1Sum["error"], TData, TQueryKey>>;
    client?: GetApiV1Sum["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1Sum["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getApiV1SumSuspenseQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1Sum["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}