import client from "../axios-client";
import { useMutation } from "@tanstack/react-query";
import type { PostApiV1SumMutationRequest, PostApiV1SumMutationResponse, PostApiV1Sum400 } from "../types/PostApiV1Sum";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostApiV1SumClient = typeof client<PostApiV1SumMutationResponse, PostApiV1Sum400, PostApiV1SumMutationRequest>;
type PostApiV1Sum = {
    data: PostApiV1SumMutationResponse;
    error: PostApiV1Sum400;
    request: PostApiV1SumMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostApiV1SumMutationResponse;
    client: {
        parameters: Partial<Parameters<PostApiV1SumClient>[0]>;
        return: Awaited<ReturnType<PostApiV1SumClient>>;
    };
};
/**
 * @description Handle the sum service using the body
 * @summary Handle the sum service using the body
 * @link /api/v1/sum
 */
export function usePostApiV1Sum(options: {
    mutation?: UseMutationOptions<PostApiV1Sum["response"], PostApiV1Sum["error"], PostApiV1Sum["request"]>;
    client?: PostApiV1Sum["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<PostApiV1Sum["data"], PostApiV1Sum["error"], PostApiV1Sum["request"]>({
                method: "post",
                url: `/api/v1/sum`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}