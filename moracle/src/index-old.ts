// This codebase's migration from Vanilla JS to TypeScript is a WIP.

require('source-map-support').install();
import 'reflect-metadata';
import { createConnection } from "typeorm";
const express = require("express");
var argv = require("minimist")(process.argv.slice(2));
const port = argv.p || 7892;
import routes from "./routes";
import NodeIdentity from "./NodeIdentity";
const axios = require("axios");
const { get } = require("./http");
import globals from "./globals";
import { sendPublishResolver } from './PublishResolver';
import MoracleMessage from './MoracleMessage';
const { broadcastToAllKnownNodes } = require("./broadcast");
const showHelp = require("./Help");

createConnection();

const app = express();
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
    globals.maxConnections = argv.maxConnections;
}
if (argv.verbose) {
    globals.verboseLogging = true;
}

let myIP;

async function setup() {
    if (argv.localhost) {
        myIP = "127.0.0.1";
    } else {
        myIP = (await axios.get("http://checkip.amazonaws.com/")).data.slice(0, -1);
    }
    globals.MyNodeIdentity = new NodeIdentity(argv.n, myIP + ":" + port);
    console.log(globals.MyNodeIdentity);
}

(async () => {
    await setup();

    app.use("/", routes);

    app.listen(port, async () => {
        console.log(`Moracle HTTP API listening on ${myIP}:${port}!`);
        if (argv.bootstrap) {
            const fs = require("fs");
            let bootstrapSockets;
            if (argv.connect) {
                bootstrapSockets = [argv.connect];
            } else {
                let data = fs.readFileSync("../bootstrap.json");
                bootstrapSockets = JSON.parse(data).sockets;
            }
            console.log("Bootstrap sockets");
            console.log(bootstrapSockets);

            const addBootstrapSocket = newSocket => {
                if (globals.KnownNodes.find(e => e.socket == newSocket) != undefined) {
                    return;
                }
                if (newSocket == `${myIP}:${port}`) {
                    return;
                }
                if (bootstrapSockets.find(socket => socket == newSocket) == undefined) {
                    bootstrapSockets.push(newSocket);
                }
            };

            let socket;

            while ((socket = bootstrapSockets.pop())) {
                const id = await get(socket, "/identity", globals.MyNodeIdentity);
                const data: MoracleMessage = id.data;
                if (data.type == 'AuthFailed') {
                    console.log("Name taken.")
                    continue;
                }
                if (id.data.data) {
                    globals.addKnownNode(id.data.from);
                    const remoteKnownNodes = await get(socket, "/knownnodes");
                    remoteKnownNodes.data.forEach(element => {
                        addBootstrapSocket(element.socket);
                    });
                }
            }
            bootstrapComplete();
        }
    });
})();

function bootstrapComplete() {
    console.log(`Discovered ${globals.KnownNodes.length} nodes`);

    if (argv.prompt) {
        process.stdin.on("data", function (data) {
            sendPublishResolver(data.toString());
        });
    }
}
