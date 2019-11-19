import NodeIdentity from "./NodeIdentity";

export interface GlobalsInterface {
    MyNodeIdentity: NodeIdentity;
    KnownNodes: NodeIdentity[];
    addKnownNode: (n: NodeIdentity) => boolean;
    maxConnections: number;
    verboseLogging: boolean;
    resolvers: any[],
    types: any[],
    mergedResolvers: any,
    mergedTypes: any,
}


var Globals: GlobalsInterface = {
    MyNodeIdentity: undefined,
    KnownNodes: [],
    addKnownNode: function(nodeIdentity: NodeIdentity): boolean {
        if (this.KnownNodes.find(node => {return nodeIdentity.name == node.name || nodeIdentity.socket == node.socket}) == undefined) {
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
}
export default Globals;