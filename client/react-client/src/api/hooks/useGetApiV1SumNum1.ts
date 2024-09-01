import client from "../axios-client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetApiV1SumNum1QueryResponse, GetApiV1SumNum1PathParams, GetApiV1SumNum1QueryParams, GetApiV1SumNum1400 } from "../types/GetApiV1SumNum1";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetApiV1SumNum1Client = typeof client<GetApiV1SumNum1QueryResponse, GetApiV1SumNum1400, never>;
type GetApiV1SumNum1 = {
    data: GetApiV1SumNum1QueryResponse;
    error: GetApiV1SumNum1400;
    request: never;
    pathParams: GetApiV1SumNum1PathParams;
    queryParams: GetApiV1SumNum1QueryParams;
    headerParams: never;
    response: GetApiV1SumNum1QueryResponse;
    client: {
        parameters: Partial<Parameters<GetApiV1SumNum1Client>[0]>;
        return: Awaited<ReturnType<GetApiV1SumNum1Client>>;
    };
};
export const getApiV1SumNum1QueryKey = (num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"]) => [{ url: "/api/v1/sum/:num1", params: { num1: num1 } }, ...(params ? [params] : [])] as const;
export type GetApiV1SumNum1QueryKey = ReturnType<typeof getApiV1SumNum1QueryKey>;
export function getApiV1SumNum1QueryOptions(num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"], options: GetApiV1SumNum1["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumNum1QueryKey(num1, params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1SumNum1["data"], GetApiV1SumNum1["error"]>({
                method: "get",
                url: `/api/v1/sum/${num1}`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle sum with first number in route path and second in query string
 * @summary Handle sum with first number in route path and second in query string
 * @link /api/v1/sum/:num1
 */
export function useGetApiV1SumNum1<TData = GetApiV1SumNum1["response"], TQueryData = GetApiV1SumNum1["response"], TQueryKey extends QueryKey = GetApiV1SumNum1QueryKey>(num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetApiV1SumNum1["response"], GetApiV1SumNum1["error"], TData, TQueryData, TQueryKey>>;
    client?: GetApiV1SumNum1["client"]["parameters"];
} = {}): UseQueryResult<TData, GetApiV1SumNum1["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumNum1QueryKey(num1, params);
    const query = useQuery({
        ...getApiV1SumNum1QueryOptions(num1, params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetApiV1SumNum1["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getApiV1SumNum1SuspenseQueryKey = (num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"]) => [{ url: "/api/v1/sum/:num1", params: { num1: num1 } }, ...(params ? [params] : [])] as const;
export type GetApiV1SumNum1SuspenseQueryKey = ReturnType<typeof getApiV1SumNum1SuspenseQueryKey>;
export function getApiV1SumNum1SuspenseQueryOptions(num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"], options: GetApiV1SumNum1["client"]["parameters"] = {}) {
    const queryKey = getApiV1SumNum1SuspenseQueryKey(num1, params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetApiV1SumNum1["data"], GetApiV1SumNum1["error"]>({
                method: "get",
                url: `/api/v1/sum/${num1}`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @description Handle sum with first number in route path and second in query string
 * @summary Handle sum with first number in route path and second in query string
 * @link /api/v1/sum/:num1
 */
export function useGetApiV1SumNum1Suspense<TData = GetApiV1SumNum1["response"], TQueryKey extends QueryKey = GetApiV1SumNum1SuspenseQueryKey>(num1: GetApiV1SumNum1PathParams["num1"], params: GetApiV1SumNum1["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetApiV1SumNum1["response"], GetApiV1SumNum1["error"], TData, TQueryKey>>;
    client?: GetApiV1SumNum1["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetApiV1SumNum1["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getApiV1SumNum1SuspenseQueryKey(num1, params);
    const query = useSuspenseQuery({
        ...getApiV1SumNum1SuspenseQueryOptions(num1, params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetApiV1SumNum1["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}