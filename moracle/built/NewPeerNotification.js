"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MoracleMessage_1 = __importDefault(require("./MoracleMessage"));
var broadcastToAllKnownNodes = require("./broadcast").broadcastToAllKnownNodes;
function sendNewPeerNotification(peer) {
    console.log("Broadcasting new peer.");
    var m = new MoracleMessage_1.default({ peer: peer }, 'NewPeerNotification');
    //console.log(">", m);
    broadcastToAllKnownNodes(m);
}
exports.sendNewPeerNotification = sendNewPeerNotification;
//# sourceMappingURL=NewPeerNotification.js.map