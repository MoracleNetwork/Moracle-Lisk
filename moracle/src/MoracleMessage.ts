import { NewPeerNotification } from "./NewPeerNotification";
import { IDReq } from "./IdentityRequest";
import { PublishResolver } from "./PublishResolver";
import NodeIdentity from "./NodeIdentity";
import blake2b from 'blake2';

// Class to encapsulate the communication between nodes.
import globals from './globals';
import { AuthFailed } from "./routes";

type MoracleData = NewPeerNotification | IDReq | PublishResolver | AuthFailed;
type MoracleTypeNames = 'NewPeerNotification' | 'IDReq' | 'IDResp' | 'PublishResolver' | 'AuthFailed';

export default class MoracleMessage {
    /*
    Valid message types:
    - IDReq
    - IDResp
    - NewPeerNotification
    */
   data: any;
   from: NodeIdentity;
   type: MoracleTypeNames;
   forward: boolean;
   timestamp: number;
   hash: string;

   
    constructor(data: MoracleData, type: MoracleTypeNames) {
        this.data = data;
        this.type = type;

        this.from = globals.MyNodeIdentity;
        
        this.timestamp = (new Date()).getTime();
        
        const h = blake2b.createHash('blake2b', {digestLength: 32});
        h.update(Buffer.from(this.getJSON()));
        this.hash = h.digest("hex");
    }

    static fromJSON(payload) {
        let parsedPayload = JSON.parse(payload);
        return new MoracleMessage(parsedPayload.data, parsedPayload.type);
    }
    getJSON() {
        return JSON.stringify({
            type: this.type,
            data: this.data,
            from: this.from,
            timestamp: this.timestamp,
        });
    }
}

