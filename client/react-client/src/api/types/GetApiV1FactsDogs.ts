import type { ResponseArrayHandlerFactResponse } from "./ResponseArrayHandlerFactResponse";
import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetApiV1FactsDogs200 = ResponseArrayHandlerFactResponse;
/**
 * @description Service Unavailable
*/
export type GetApiV1FactsDogs503 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1FactsDogsQueryResponse = ResponseArrayHandlerFactResponse;
export type GetApiV1FactsDogsQuery = {
    Response: GetApiV1FactsDogsQueryResponse;
    Errors: GetApiV1FactsDogs503;
};