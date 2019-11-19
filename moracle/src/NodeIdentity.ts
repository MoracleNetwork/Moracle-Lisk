// Class to encapsulate a connected peer, abstracting beyond the socket.

export default class NodeIdentity {
    name: string;
    socket: string;
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
    }
}

