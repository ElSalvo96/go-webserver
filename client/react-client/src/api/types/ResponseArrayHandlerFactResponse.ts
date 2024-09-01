import type { HandlerFactResponse } from "./handler/FactResponse";

 export type ResponseArrayHandlerFactResponse = {
    /**
     * @type array | undefined
    */
    data?: HandlerFactResponse[];
    /**
     * @type boolean | undefined
    */
    error?: boolean;
    /**
     * @type string | undefined
    */
    message?: string;
};