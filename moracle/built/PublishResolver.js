"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MoracleMessage_1 = __importDefault(require("./MoracleMessage"));
var broadcast_1 = require("./broadcast");
function sendPublishResolver(s) {
    var m = new MoracleMessage_1.default({ payload: s }, 'PublishResolver');
    broadcast_1.broadcastToAllKnownNodes(m);
}
exports.sendPublishResolver = sendPublishResolver;
function processPublishResolver() {
}
//# sourceMappingURL=PublishResolver.js.map