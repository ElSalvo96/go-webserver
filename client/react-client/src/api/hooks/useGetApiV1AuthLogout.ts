import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1AuthLogoutQueryResponse, GetApiV1AuthLogout401, GetApiV1AuthLogout503 } from "../types/GetApiV1AuthLogout";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1AuthLogoutClient = typeof client<GetApiV1AuthLogoutQueryResponse, GetApiV1AuthLogout401 | GetApiV1AuthLogout503, never>;
type GetApiV1AuthLogout = {
    data: GetApiV1AuthLogoutQueryResponse;
    error: GetApiV1AuthLogout401 | GetApiV1AuthLogout503;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetApiV1AuthLogoutQueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1AuthLogoutClient>[0]>;
        return: Awaited<ReturnType<GetApiV1AuthLogoutClient>>;
    };
};
export const getApiV1AuthLogoutQueryKey = () => [{ url: "/api/v1/auth/logout" }] as const;
export type GetApiV1AuthLogoutQueryKey = ReturnType<typeof getApiV1AuthLogoutQueryKey>;
export function getApiV1AuthLogoutQueryOptions(options: GetApiV1AuthLogout["client"]["parameters"] = {}) {
    const queryKey = getApiV1AuthLogoutQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1AuthLogout["data"], GetApiV1AuthLogout["error"]>({
                method: "get",
                url: `/api/v1/auth/logout`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle logout and clear the access token from the Cookie
 * @summary Handle logout and clear the access token from the Cookie
 * @link /api/v1/auth/logout
 */
export function useGetApiV1AuthLogout<TData = GetApiV1AuthLogout["response"], TQueryData = GetApiV1AuthLogout["response"], TQueryKey extends QueryKey = GetApiV1AuthLogoutQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetApiV1AuthLogout["response"], GetApiV1AuthLogout["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1AuthLogout["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1AuthLogout["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1AuthLogoutQueryKey();
    const query = useQuery({
        ...getApiV1AuthLogoutQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1AuthLogout["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1AuthLogoutSuspenseQueryKey = () => [{ url: "/api/v1/auth/logout" }] as const;
export type GetApiV1AuthLogoutSuspenseQueryKey = ReturnType<typeof getApiV1AuthLogoutSuspenseQueryKey>;
export function getApiV1AuthLogoutSuspenseQueryOptions(options: GetApiV1AuthLogout["client"]["parameters"] = {}) {
    const queryKey = getApiV1AuthLogoutSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1AuthLogout["data"], GetApiV1AuthLogout["error"]>({
                method: "get",
                url: `/api/v1/auth/logout`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle logout and clear the access token from the Cookie
 * @summary Handle logout and clear the access token from the Cookie
 * @link /api/v1/auth/logout
 */
export function useGetApiV1AuthLogoutSuspense<TData = GetApiV1AuthLogout["response"], TQueryKey extends QueryKey = GetApiV1AuthLogoutSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1AuthLogout["response"], GetApiV1AuthLogout["error"], TData, TQueryKey>>;
    client?: GetApiV1AuthLogout["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1AuthLogout["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1AuthLogoutSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getApiV1AuthLogoutSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1AuthLogout["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}