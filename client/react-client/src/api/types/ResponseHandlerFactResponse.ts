import type { HandlerFactResponse } from "./handler/FactResponse";

 export type ResponseHandlerFactResponse = {
    data?: HandlerFactResponse;
    /**
     * @type boolean | undefined
    */
    error?: boolean;
    /**
     * @type string | undefined
    */
    message?: string;
};