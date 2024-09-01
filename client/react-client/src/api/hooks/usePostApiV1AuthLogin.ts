import client from "../axios-client";
import { useMutation } from "@tanstack/react-query";
import type { PostApiV1AuthLoginMutationRequest, PostApiV1AuthLoginMutationResponse, PostApiV1AuthLogin400, PostApiV1AuthLogin401, PostApiV1AuthLogin403, PostApiV1AuthLogin503 } from "../types/PostApiV1AuthLogin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostApiV1AuthLoginClient = typeof client<PostApiV1AuthLoginMutationResponse, PostApiV1AuthLogin400 | PostApiV1AuthLogin401 | PostApiV1AuthLogin403 | PostApiV1AuthLogin503, PostApiV1AuthLoginMutationRequest>;
type PostApiV1AuthLogin = {
    data: PostApiV1AuthLoginMutationResponse;
    error: PostApiV1AuthLogin400 | PostApiV1AuthLogin401 | PostApiV1AuthLogin403 | PostApiV1AuthLogin503;
    request: PostApiV1AuthLoginMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostApiV1AuthLoginMutationResponse;
    client: {
        parameters: Partial<Parameters<PostApiV1AuthLoginClient>[0]>;
        return: Awaited<ReturnType<PostApiV1AuthLoginClient>>;
    };
};
/**
 * @description Handle login and set the access token into the cookie
 * @summary Handle login and set the access token into the cookie
 * @link /api/v1/auth/login
 */
export function usePostApiV1AuthLogin(options: {
    mutation?: UseMutationOptions<PostApiV1AuthLogin["response"], PostApiV1AuthLogin["error"], PostApiV1AuthLogin["request"]>;
    client?: PostApiV1AuthLogin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<PostApiV1AuthLogin["data"], PostApiV1AuthLogin["error"], PostApiV1AuthLogin["request"]>({
                method: "post",
                url: `/api/v1/auth/login`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}