import type { ResponseSumOutput } from "./ResponseSumOutput";
import type { ResponseString } from "./ResponseString";

 export type GetApiV1SumNum1PathParams = {
    /**
     * @description Number One
     * @type integer
    */
    num1: number;
};
export type GetApiV1SumNum1QueryParams = {
    /**
     * @description Number Two
     * @type integer
    */
    num2: number;
};
/**
 * @description OK
*/
export type GetApiV1SumNum1200 = ResponseSumOutput;
/**
 * @description Bad Request
*/
export type GetApiV1SumNum1400 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1SumNum1QueryResponse = ResponseSumOutput;
export type GetApiV1SumNum1Query = {
    Response: GetApiV1SumNum1QueryResponse;
    PathParams: GetApiV1SumNum1PathParams;
    QueryParams: GetApiV1SumNum1QueryParams;
    Errors: GetApiV1SumNum1400;
};