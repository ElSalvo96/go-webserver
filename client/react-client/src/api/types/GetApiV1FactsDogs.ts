import type { ResponseHandlerFactResponse } from "./ResponseHandlerFactResponse";
import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetApiV1FactsDogs200 = ResponseHandlerFactResponse;
/**
 * @description Service Unavailable
*/
export type GetApiV1FactsDogs503 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1FactsDogsQueryResponse = ResponseHandlerFactResponse;
export type GetApiV1FactsDogsQuery = {
    Response: GetApiV1FactsDogsQueryResponse;
    Errors: GetApiV1FactsDogs503;
};