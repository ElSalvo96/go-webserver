import type { ResponseArrayHandlerFactResponse } from "./ResponseArrayHandlerFactResponse";
import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetApiV1FactsCats200 = ResponseArrayHandlerFactResponse;
/**
 * @description Unauthorized
*/
export type GetApiV1FactsCats401 = ResponseString;
/**
 * @description Service Unavailable
*/
export type GetApiV1FactsCats503 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1FactsCatsQueryResponse = ResponseArrayHandlerFactResponse;
export type GetApiV1FactsCatsQuery = {
    Response: GetApiV1FactsCatsQueryResponse;
    Errors: GetApiV1FactsCats401 | GetApiV1FactsCats503;
};