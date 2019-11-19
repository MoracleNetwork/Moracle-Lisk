const axios = require("axios");
const globals = require("./globals");

module.exports = class MoracleClient {
    constructor(socket = "http://127.0.0.1:7892") {
        this.socket = socket;
    }

    async rpcRequest(body) {
        const c = await axios.post(`${this.socket}/rpc`, body);
        return c.data;
    }

    async moracleRequest(txId, query) {
        if (globals.processedTxIds.includes(txId)) {
            return undefined;
        } else {
            globals.processedTxIds.push(txId);
            const body = {
                query,
                txId
            };
            return (await axios.post(`${this.socket}/moraclerequest`, body)).data.data;
        }
    }
};
