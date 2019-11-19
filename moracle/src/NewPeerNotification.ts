import MoracleMessage from "./MoracleMessage";
import NodeIdentity from "./NodeIdentity";

const { broadcastToAllKnownNodes } = require("./broadcast");

export interface NewPeerNotification {
    peer: string;
}

export function sendNewPeerNotification(peer) {
    console.log("Broadcasting new peer.");
    const m = new MoracleMessage({ peer: peer }, 'NewPeerNotification');
    //console.log(">", m);
    broadcastToAllKnownNodes(m);
}

