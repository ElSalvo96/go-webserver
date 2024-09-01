import type { SumOutput } from "./SumOutput";

 export type ResponseSumOutput = {
    data?: SumOutput;
    /**
     * @type boolean | undefined
    */
    error?: boolean;
    /**
     * @type string | undefined
    */
    message?: string;
};