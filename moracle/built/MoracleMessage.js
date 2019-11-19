"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blake2_1 = __importDefault(require("blake2"));
// Class to encapsulate the communication between nodes.
var globals_1 = __importDefault(require("./globals"));
var MoracleMessage = /** @class */ (function () {
    function MoracleMessage(data, type) {
        this.data = data;
        this.type = type;
        this.from = globals_1.default.MyNodeIdentity;
        this.timestamp = (new Date()).getTime();
        var h = blake2_1.default.createHash('blake2b', { digestLength: 32 });
        h.update(Buffer.from(this.getJSON()));
        this.hash = h.digest("hex");
    }
    MoracleMessage.fromJSON = function (payload) {
        var parsedPayload = JSON.parse(payload);
        return new MoracleMessage(parsedPayload.data, parsedPayload.type);
    };
    MoracleMessage.prototype.getJSON = function () {
        return JSON.stringify({
            type: this.type,
            data: this.data,
            from: this.from,
            timestamp: this.timestamp,
        });
    };
    return MoracleMessage;
}());
exports.default = MoracleMessage;
//# sourceMappingURL=MoracleMessage.js.map