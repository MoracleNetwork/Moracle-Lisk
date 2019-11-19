// unused
import MoracleMessage from "./MoracleMessage";
const get = require("./http");

export interface IDReq {
    version: string;
}

export async function sendIdentityRequest(me, socket) {
    const m = new MoracleMessage({ version: '1' },
        "IDReq"
    ).getJSON();

    const response = await get(socket, "/identity", m);
    return response;
}

function createIdentityRequestResponse() {
    return new MoracleMessage({ version: '1' }, "IDResp").getJSON();
}

module.exports = { sendIdentityRequest, createIdentityRequestResponse };
