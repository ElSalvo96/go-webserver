import type { ResponseSumOutput } from "./ResponseSumOutput";
import type { ResponseString } from "./ResponseString";

 export type GetApiV1SumQueryParams = {
    /**
     * @description Number One
     * @type integer
    */
    num1: number;
    /**
     * @description Number Two
     * @type integer
    */
    num2: number;
};
/**
 * @description OK
*/
export type GetApiV1Sum200 = ResponseSumOutput;
/**
 * @description Bad Request
*/
export type GetApiV1Sum400 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1SumQueryResponse = ResponseSumOutput;
export type GetApiV1SumQuery = {
    Response: GetApiV1SumQueryResponse;
    QueryParams: GetApiV1SumQueryParams;
    Errors: GetApiV1Sum400;
};