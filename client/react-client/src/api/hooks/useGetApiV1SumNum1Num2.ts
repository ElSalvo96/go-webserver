import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1SumNum1Num2QueryResponse, GetApiV1SumNum1Num2PathParams, GetApiV1SumNum1Num2400 } from "../types/GetApiV1SumNum1Num2";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1SumNum1Num2Client = typeof client<GetApiV1SumNum1Num2QueryResponse, GetApiV1SumNum1Num2400, never>;
type GetApiV1SumNum1Num2 = {
    data: GetApiV1SumNum1Num2QueryResponse;
    error: GetApiV1SumNum1Num2400;
    request: never;
    pathParams: GetApiV1SumNum1Num2PathParams;
    queryParams: never;
    headerParams: never;
    response: GetApiV1SumNum1Num2QueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1SumNum1Num2Client>[0]>;
        return: Awaited<ReturnType<GetApiV1SumNum1Num2Client>>;
    };
};
export const getApiV1SumNum1Num2QueryKey = (num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"]) => [{ url: "/api/v1/sum/:num1/:num2", params: { num1: num1, num2: num2 } }] as const;
export type GetApiV1SumNum1Num2QueryKey = ReturnType<typeof getApiV1SumNum1Num2QueryKey>;
export function getApiV1SumNum1Num2QueryOptions(num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"], options: GetApiV1SumNum1Num2["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumNum1Num2QueryKey(num1, num2);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1SumNum1Num2["data"], GetApiV1SumNum1Num2["error"]>({
                method: "get",
                url: `/api/v1/sum/${num1}/${num2}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle the sum service using the route path
 * @summary Handle the sum service using the route path
 * @link /api/v1/sum/:num1/:num2
 */
export function useGetApiV1SumNum1Num2<TData = GetApiV1SumNum1Num2["response"], TQueryData = GetApiV1SumNum1Num2["response"], TQueryKey extends QueryKey = GetApiV1SumNum1Num2QueryKey>(num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"], options: {
    query?: Partial<QueryObserverOptions<GetApiV1SumNum1Num2["response"], GetApiV1SumNum1Num2["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1SumNum1Num2["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1SumNum1Num2["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumNum1Num2QueryKey(num1, num2);
    const query = useQuery({
        ...getApiV1SumNum1Num2QueryOptions(num1, num2, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1SumNum1Num2["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1SumNum1Num2SuspenseQueryKey = (num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"]) => [{ url: "/api/v1/sum/:num1/:num2", params: { num1: num1, num2: num2 } }] as const;
export type GetApiV1SumNum1Num2SuspenseQueryKey = ReturnType<typeof getApiV1SumNum1Num2SuspenseQueryKey>;
export function getApiV1SumNum1Num2SuspenseQueryOptions(num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"], options: GetApiV1SumNum1Num2["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumNum1Num2SuspenseQueryKey(num1, num2);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1SumNum1Num2["data"], GetApiV1SumNum1Num2["error"]>({
                method: "get",
                url: `/api/v1/sum/${num1}/${num2}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle the sum service using the route path
 * @summary Handle the sum service using the route path
 * @link /api/v1/sum/:num1/:num2
 */
export function useGetApiV1SumNum1Num2Suspense<TData = GetApiV1SumNum1Num2["response"], TQueryKey extends QueryKey = GetApiV1SumNum1Num2SuspenseQueryKey>(num1: GetApiV1SumNum1Num2PathParams["num1"], num2: GetApiV1SumNum1Num2PathParams["num2"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1SumNum1Num2["response"], GetApiV1SumNum1Num2["error"], TData, TQueryKey>>;
    client?: GetApiV1SumNum1Num2["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1SumNum1Num2["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumNum1Num2SuspenseQueryKey(num1, num2);
    const query = useSuspenseQuery({
        ...getApiV1SumNum1Num2SuspenseQueryOptions(num1, num2, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1SumNum1Num2["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}