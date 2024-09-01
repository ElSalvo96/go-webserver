import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1FactsCatsQueryResponse, GetApiV1FactsCats401, GetApiV1FactsCats503 } from "../types/GetApiV1FactsCats";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1FactsCatsClient = typeof client<GetApiV1FactsCatsQueryResponse, GetApiV1FactsCats401 | GetApiV1FactsCats503, never>;
type GetApiV1FactsCats = {
    data: GetApiV1FactsCatsQueryResponse;
    error: GetApiV1FactsCats401 | GetApiV1FactsCats503;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetApiV1FactsCatsQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1FactsCatsClient>[0]>;
        return: Awaited<ReturnType<GetApiV1FactsCatsClient>>;
    };
};
export const getApiV1FactsCatsQueryKey = () => [{ url: "/api/v1/facts/cats" }] as const;
export type GetApiV1FactsCatsQueryKey = ReturnType<typeof getApiV1FactsCatsQueryKey>;
export function getApiV1FactsCatsQueryOptions(options: GetApiV1FactsCats["client"]["parameters"] = {}) {
    const queryKey = getApiV1FactsCatsQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1FactsCats["data"], GetApiV1FactsCats["error"]>({
                method: "get",
                url: `/api/v1/facts/cats`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Facts about cats
 * @summary Facts about cats
 * @link /api/v1/facts/cats
 */
export function useGetApiV1FactsCats<TData = GetApiV1FactsCats["response"], TQueryData = GetApiV1FactsCats["response"], TQueryKey extends QueryKey = GetApiV1FactsCatsQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetApiV1FactsCats["response"], GetApiV1FactsCats["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1FactsCats["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1FactsCats["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1FactsCatsQueryKey();
    const query = useQuery({
        ...getApiV1FactsCatsQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1FactsCats["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1FactsCatsSuspenseQueryKey = () => [{ url: "/api/v1/facts/cats" }] as const;
export type GetApiV1FactsCatsSuspenseQueryKey = ReturnType<typeof getApiV1FactsCatsSuspenseQueryKey>;
export function getApiV1FactsCatsSuspenseQueryOptions(options: GetApiV1FactsCats["client"]["parameters"] = {}) {
    const queryKey = getApiV1FactsCatsSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1FactsCats["data"], GetApiV1FactsCats["error"]>({
                method: "get",
                url: `/api/v1/facts/cats`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Facts about cats
 * @summary Facts about cats
 * @link /api/v1/facts/cats
 */
export function useGetApiV1FactsCatsSuspense<TData = GetApiV1FactsCats["response"], TQueryKey extends QueryKey = GetApiV1FactsCatsSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1FactsCats["response"], GetApiV1FactsCats["error"], TData, TQueryKey>>;
    client?: GetApiV1FactsCats["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1FactsCats["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1FactsCatsSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getApiV1FactsCatsSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1FactsCats["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}