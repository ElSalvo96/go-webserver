import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1AuthIsloggedinQueryResponse, GetApiV1AuthIsloggedin401, GetApiV1AuthIsloggedin503 } from "../types/GetApiV1AuthIsloggedin";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1AuthIsloggedinClient = typeof client<GetApiV1AuthIsloggedinQueryResponse, GetApiV1AuthIsloggedin401 | GetApiV1AuthIsloggedin503, never>;
type GetApiV1AuthIsloggedin = {
    data: GetApiV1AuthIsloggedinQueryResponse;
    error: GetApiV1AuthIsloggedin401 | GetApiV1AuthIsloggedin503;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetApiV1AuthIsloggedinQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1AuthIsloggedinClient>[0]>;
        return: Awaited<ReturnType<GetApiV1AuthIsloggedinClient>>;
    };
};
export const getApiV1AuthIsloggedinQueryKey = () => [{ url: "/api/v1/auth/isLoggedIn" }] as const;
export type GetApiV1AuthIsloggedinQueryKey = ReturnType<typeof getApiV1AuthIsloggedinQueryKey>;
export function getApiV1AuthIsloggedinQueryOptions(options: GetApiV1AuthIsloggedin["client"]["parameters"] = {}) {
    const queryKey = getApiV1AuthIsloggedinQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1AuthIsloggedin["data"], GetApiV1AuthIsloggedin["error"]>({
                method: "get",
                url: `/api/v1/auth/isLoggedIn`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle checking if the user is logged in
 * @summary Handle checking if the user is logged in
 * @link /api/v1/auth/isLoggedIn
 */
export function useGetApiV1AuthIsloggedin<TData = GetApiV1AuthIsloggedin["response"], TQueryData = GetApiV1AuthIsloggedin["response"], TQueryKey extends QueryKey = GetApiV1AuthIsloggedinQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetApiV1AuthIsloggedin["response"], GetApiV1AuthIsloggedin["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1AuthIsloggedin["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1AuthIsloggedin["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1AuthIsloggedinQueryKey();
    const query = useQuery({
        ...getApiV1AuthIsloggedinQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1AuthIsloggedin["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1AuthIsloggedinSuspenseQueryKey = () => [{ url: "/api/v1/auth/isLoggedIn" }] as const;
export type GetApiV1AuthIsloggedinSuspenseQueryKey = ReturnType<typeof getApiV1AuthIsloggedinSuspenseQueryKey>;
export function getApiV1AuthIsloggedinSuspenseQueryOptions(options: GetApiV1AuthIsloggedin["client"]["parameters"] = {}) {
    const queryKey = getApiV1AuthIsloggedinSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1AuthIsloggedin["data"], GetApiV1AuthIsloggedin["error"]>({
                method: "get",
                url: `/api/v1/auth/isLoggedIn`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle checking if the user is logged in
 * @summary Handle checking if the user is logged in
 * @link /api/v1/auth/isLoggedIn
 */
export function useGetApiV1AuthIsloggedinSuspense<TData = GetApiV1AuthIsloggedin["response"], TQueryKey extends QueryKey = GetApiV1AuthIsloggedinSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1AuthIsloggedin["response"], GetApiV1AuthIsloggedin["error"], TData, TQueryKey>>;
    client?: GetApiV1AuthIsloggedin["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1AuthIsloggedin["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1AuthIsloggedinSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getApiV1AuthIsloggedinSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1AuthIsloggedin["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}