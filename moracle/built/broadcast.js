"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post = require("./http").post;
var globals_1 = __importDefault(require("./globals"));
function broadcastToAllKnownNodes(message) {
    globals_1.default.KnownNodes.forEach(function (node) {
        post(node.socket, "/msg", message);
    });
}
exports.broadcastToAllKnownNodes = broadcastToAllKnownNodes;
//# sourceMappingURL=broadcast.js.map