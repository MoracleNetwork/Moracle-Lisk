"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var globals_1 = __importDefault(require("./globals"));
var createIdentityRequestResponse = require("./IdentityRequest").createIdentityRequestResponse;
var version_1 = require("./version");
var StoredResult_1 = require("./entities/StoredResult");
var graphql_1 = require("graphql");
router.get("/versioncheck", function (req, res) {
    console.log("Got version check. ");
    res.send(version_1.version);
});
router.post("/msg", function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});
router.post("/rpc", function (req, res) {
    if (req.connection.remoteAddress == '::1') {
        console.log(req.body);
    }
    console.log(globals_1.default.types);
    res.sendStatus(200);
});
router.post('/moraclerequest', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, id, storedResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.body.query;
                    id = req.body.txId;
                    if (!(id !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, StoredResult_1.StoredResult.findOne({ txId: id })];
                case 1:
                    storedResults = _a.sent();
                    if (storedResults !== undefined) {
                        res.send(JSON.parse(storedResults.serializedResult));
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    graphql_1.graphql(globals_1.default.mergedTypes, query, globals_1.default.mergedResolvers).then(function (response) {
                        if (id !== undefined) {
                            var s = new StoredResult_1.StoredResult();
                            s.serializedResult = JSON.stringify(response);
                            s.txId = id;
                            s.save();
                        }
                        res.send(response);
                        return;
                    });
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map