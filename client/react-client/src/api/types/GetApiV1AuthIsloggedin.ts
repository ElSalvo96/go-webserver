import type { ResponseBool } from "./ResponseBool";
import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetApiV1AuthIsloggedin200 = ResponseBool;
/**
 * @description Unauthorized
*/
export type GetApiV1AuthIsloggedin401 = ResponseString;
/**
 * @description Service Unavailable
*/
export type GetApiV1AuthIsloggedin503 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1AuthIsloggedinQueryResponse = ResponseBool;
export type GetApiV1AuthIsloggedinQuery = {
    Response: GetApiV1AuthIsloggedinQueryResponse;
    Errors: GetApiV1AuthIsloggedin401 | GetApiV1AuthIsloggedin503;
};