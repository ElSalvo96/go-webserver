import type { ResponseBool } from "./ResponseBool";
import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetApiV1AuthLogout200 = ResponseBool;
/**
 * @description Unauthorized
*/
export type GetApiV1AuthLogout401 = ResponseString;
/**
 * @description Service Unavailable
*/
export type GetApiV1AuthLogout503 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1AuthLogoutQueryResponse = ResponseBool;
export type GetApiV1AuthLogoutQuery = {
    Response: GetApiV1AuthLogoutQueryResponse;
    Errors: GetApiV1AuthLogout401 | GetApiV1AuthLogout503;
};