import MoracleMessage from "./MoracleMessage";
import { broadcastToAllKnownNodes } from "./broadcast";

export interface PublishResolver {
    payload: string;
}

export function sendPublishResolver(s: string) {
    const m = new MoracleMessage({payload: s}, 'PublishResolver');
    broadcastToAllKnownNodes(m);
}

function processPublishResolver() {
}


