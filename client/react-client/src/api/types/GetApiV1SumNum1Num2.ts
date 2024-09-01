import type { ResponseSumOutput } from "./ResponseSumOutput";
import type { ResponseString } from "./ResponseString";

 export type GetApiV1SumNum1Num2PathParams = {
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
export type GetApiV1SumNum1Num2200 = ResponseSumOutput;
/**
 * @description Bad Request
*/
export type GetApiV1SumNum1Num2400 = ResponseString;
/**
 * @description OK
*/
export type GetApiV1SumNum1Num2QueryResponse = ResponseSumOutput;
export type GetApiV1SumNum1Num2Query = {
    Response: GetApiV1SumNum1Num2QueryResponse;
    PathParams: GetApiV1SumNum1Num2PathParams;
    Errors: GetApiV1SumNum1Num2400;
};