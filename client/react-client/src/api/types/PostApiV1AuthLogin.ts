import type { ResponseBool } from "./ResponseBool";
import type { ResponseString } from "./ResponseString";
import type { HandlerLoginInput } from "./handler/LoginInput";

 /**
 * @description OK
*/
export type PostApiV1AuthLogin200 = ResponseBool;
/**
 * @description Bad Request
*/
export type PostApiV1AuthLogin400 = ResponseString;
/**
 * @description Unauthorized
*/
export type PostApiV1AuthLogin401 = ResponseString;
/**
 * @description Forbidden
*/
export type PostApiV1AuthLogin403 = ResponseString;
/**
 * @description Service Unavailable
*/
export type PostApiV1AuthLogin503 = ResponseString;
/**
 * @description Body
*/
export type PostApiV1AuthLoginMutationRequest = HandlerLoginInput;
/**
 * @description OK
*/
export type PostApiV1AuthLoginMutationResponse = ResponseBool;
export type PostApiV1AuthLoginMutation = {
    Response: PostApiV1AuthLoginMutationResponse;
    Request: PostApiV1AuthLoginMutationRequest;
    Errors: PostApiV1AuthLogin400 | PostApiV1AuthLogin401 | PostApiV1AuthLogin403 | PostApiV1AuthLogin503;
};