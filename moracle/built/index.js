"use strict";
// This codebase's migration from Vanilla JS to TypeScript is a WIP.
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var argv = require("minimist")(process.argv.slice(2));
var port = argv.p || 7892;
var routes_1 = __importDefault(require("./routes"));
var axios = require("axios");
var get = require("./http").get;
var globals_1 = __importDefault(require("./globals"));
var Resolver_1 = require("./entities/Resolver");
var ResolverProcessor_1 = require("./resolver-processing/ResolverProcessor");
var broadcastToAllKnownNodes = require("./broadcast").broadcastToAllKnownNodes;
var showHelp = require("./Help");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var graphql_1 = require("graphql");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
console.log(argv);
if (Object.keys(argv).length < 3) {
    console.log("Use --help for help.");
}
if (argv.help) {
    showHelp();
}
if (argv.maxConnections) {
    globals_1.default.maxConnections = argv.maxConnections;
}
if (argv.verbose) {
    globals_1.default.verboseLogging = true;
}
var myIP;
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        var dbResolvers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                case 1:
                    _a.sent();
                    if (!argv.localhost) return [3 /*break*/, 2];
                    myIP = "127.0.0.1";
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, axios.get("http://checkip.amazonaws.com/")];
                case 3:
                    myIP = (_a.sent()).data.slice(0, -1);
                    _a.label = 4;
                case 4: return [4 /*yield*/, Resolver_1.Resolver.find()];
                case 5:
                    dbResolvers = _a.sent();
                    dbResolvers.forEach(function (resolver) {
                        var r = ResolverProcessor_1.unserializeResolver(resolver.serialized);
                        globals_1.default.resolvers.push(r.root);
                        globals_1.default.types.push(r.schema);
                    });
                    globals_1.default.mergedTypes = graphql_1.buildSchema(merge_graphql_schemas_1.mergeTypes(globals_1.default.types, { all: true }));
                    globals_1.default.mergedResolvers = merge_graphql_schemas_1.mergeResolvers(globals_1.default.resolvers);
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, setup()];
            case 1:
                _a.sent();
                app.use("/", routes_1.default);
                app.listen(port, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("Moracle HTTP API listening on " + myIP + ":" + port + "!");
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map