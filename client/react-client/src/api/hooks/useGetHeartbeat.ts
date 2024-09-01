import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetHeartbeatQueryResponse } from "../types/GetHeartbeat";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetHeartbeatClient = typeof client<GetHeartbeatQueryResponse, never, never>;
type GetHeartbeat = {
    data: GetHeartbeatQueryResponse;
    error: never;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetHeartbeatQueryResponse;
    client: {
        parameters: Partial<Parameters<GetHeartbeatClient>[0]>;
        return: Awaited<ReturnType<GetHeartbeatClient>>;
    };
};
export const getHeartbeatQueryKey = () => [{ url: "/heartbeat" }] as const;
export type GetHeartbeatQueryKey = ReturnType<typeof getHeartbeatQueryKey>;
export function getHeartbeatQueryOptions(options: GetHeartbeat["client"]["parameters"] = {}) {
    const queryKey = getHeartbeatQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetHeartbeat["data"], GetHeartbeat["error"]>({
                method: "get",
                url: `/heartbeat`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Heartbeat returns a JSON response with the heartbeat status
 * @summary Heartbeat returns a JSON response with the heartbeat status
 * @link /heartbeat
 */
export function useGetHeartbeat<TData = GetHeartbeat["response"], TQueryData = GetHeartbeat["response"], TQueryKey extends QueryKey = GetHeartbeatQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetHeartbeat["response"], GetHeartbeat["error"], TData, TQueryData, TQueryKey>>;
    client?: GetHeartbeat["client"]["parameters"];
} = {}): UseQueryResult<TData, GetHeartbeat["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getHeartbeatQueryKey();
    const query = useQuery({
        ...getHeartbeatQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetHeartbeat["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getHeartbeatSuspenseQueryKey = () => [{ url: "/heartbeat" }] as const;
export type GetHeartbeatSuspenseQueryKey = ReturnType<typeof getHeartbeatSuspenseQueryKey>;
export function getHeartbeatSuspenseQueryOptions(options: GetHeartbeat["client"]["parameters"] = {}) {
    const queryKey = getHeartbeatSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetHeartbeat["data"], GetHeartbeat["error"]>({
                method: "get",
                url: `/heartbeat`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Heartbeat returns a JSON response with the heartbeat status
 * @summary Heartbeat returns a JSON response with the heartbeat status
 * @link /heartbeat
 */
export function useGetHeartbeatSuspense<TData = GetHeartbeat["response"], TQueryKey extends QueryKey = GetHeartbeatSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetHeartbeat["response"], GetHeartbeat["error"], TData, TQueryKey>>;
    client?: GetHeartbeat["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetHeartbeat["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getHeartbeatSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getHeartbeatSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetHeartbeat["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}