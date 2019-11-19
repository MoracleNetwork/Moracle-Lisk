"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Globals = {
    MyNodeIdentity: undefined,
    KnownNodes: [],
    addKnownNode: function (nodeIdentity) {
        if (this.KnownNodes.find(function (node) { return nodeIdentity.name == node.name || nodeIdentity.socket == node.socket; }) == undefined) {
            if (this.KnownNodes.length < this.maxConnections) {
                this.KnownNodes.push(nodeIdentity);
                return true;
            }
        }
        return false;
    },
    maxConnections: 50,
    verboseLogging: false,
    resolvers: [],
    types: [],
    mergedResolvers: undefined,
    mergedTypes: undefined
};
exports.default = Globals;
//# sourceMappingURL=globals.js.map