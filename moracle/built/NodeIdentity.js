"use strict";
// Class to encapsulate a connected peer, abstracting beyond the socket.
Object.defineProperty(exports, "__esModule", { value: true });
var NodeIdentity = /** @class */ (function () {
    function NodeIdentity(name, socket) {
        this.name = name;
        this.socket = socket;
    }
    return NodeIdentity;
}());
exports.default = NodeIdentity;
//# sourceMappingURL=NodeIdentity.js.map