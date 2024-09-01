import type { ResponseSumOutput } from "./ResponseSumOutput";
import type { ResponseString } from "./ResponseString";
import type { SumInput } from "./SumInput";

 /**
 * @description OK
*/
export type PostApiV1Sum200 = ResponseSumOutput;
/**
 * @description Bad Request
*/
export type PostApiV1Sum400 = ResponseString;
/**
 * @description body input
*/
export type PostApiV1SumMutationRequest = SumInput;
/**
 * @description OK
*/
export type PostApiV1SumMutationResponse = ResponseSumOutput;
export type PostApiV1SumMutation = {
    Response: PostApiV1SumMutationResponse;
    Request: PostApiV1SumMutationRequest;
    Errors: PostApiV1Sum400;
};