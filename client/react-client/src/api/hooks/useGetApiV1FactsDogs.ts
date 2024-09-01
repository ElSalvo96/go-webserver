import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1FactsDogsQueryResponse, GetApiV1FactsDogs503 } from "../types/GetApiV1FactsDogs";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1FactsDogsClient = typeof client<GetApiV1FactsDogsQueryResponse, GetApiV1FactsDogs503, never>;
type GetApiV1FactsDogs = {
    data: GetApiV1FactsDogsQueryResponse;
    error: GetApiV1FactsDogs503;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetApiV1FactsDogsQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1FactsDogsClient>[0]>;
        return: Awaited<ReturnType<GetApiV1FactsDogsClient>>;
    };
};
export const getApiV1FactsDogsQueryKey = () => [{ url: "/api/v1/facts/dogs" }] as const;
export type GetApiV1FactsDogsQueryKey = ReturnType<typeof getApiV1FactsDogsQueryKey>;
export function getApiV1FactsDogsQueryOptions(options: GetApiV1FactsDogs["client"]["parameters"] = {}) {
    const queryKey = getApiV1FactsDogsQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1FactsDogs["data"], GetApiV1FactsDogs["error"]>({
                method: "get",
                url: `/api/v1/facts/dogs`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Facts about dogs
 * @summary Facts about dogs
 * @link /api/v1/facts/dogs
 */
export function useGetApiV1FactsDogs<TData = GetApiV1FactsDogs["response"], TQueryData = GetApiV1FactsDogs["response"], TQueryKey extends QueryKey = GetApiV1FactsDogsQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetApiV1FactsDogs["response"], GetApiV1FactsDogs["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1FactsDogs["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1FactsDogs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1FactsDogsQueryKey();
    const query = useQuery({
        ...getApiV1FactsDogsQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1FactsDogs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1FactsDogsSuspenseQueryKey = () => [{ url: "/api/v1/facts/dogs" }] as const;
export type GetApiV1FactsDogsSuspenseQueryKey = ReturnType<typeof getApiV1FactsDogsSuspenseQueryKey>;
export function getApiV1FactsDogsSuspenseQueryOptions(options: GetApiV1FactsDogs["client"]["parameters"] = {}) {
    const queryKey = getApiV1FactsDogsSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1FactsDogs["data"], GetApiV1FactsDogs["error"]>({
                method: "get",
                url: `/api/v1/facts/dogs`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Facts about dogs
 * @summary Facts about dogs
 * @link /api/v1/facts/dogs
 */
export function useGetApiV1FactsDogsSuspense<TData = GetApiV1FactsDogs["response"], TQueryKey extends QueryKey = GetApiV1FactsDogsSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1FactsDogs["response"], GetApiV1FactsDogs["error"], TData, TQueryKey>>;
    client?: GetApiV1FactsDogs["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1FactsDogs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1FactsDogsSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getApiV1FactsDogsSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1FactsDogs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}