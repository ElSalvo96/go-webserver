import type { ResponseString } from "./ResponseString";

 /**
 * @description OK
*/
export type GetHeartbeat200 = ResponseString;
/**
 * @description OK
*/
export type GetHeartbeatQueryResponse = ResponseString;
export type GetHeartbeatQuery = {
    Response: GetHeartbeatQueryResponse;
};