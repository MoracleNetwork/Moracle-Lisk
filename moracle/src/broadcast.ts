const { post } = require("./http");
import globals from "./globals";

export function broadcastToAllKnownNodes(message) {
    globals.KnownNodes.forEach(node => {
        post(node.socket, "/msg", message);
    });
}

