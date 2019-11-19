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
import { Resolver } from './entities/Resolver';
import { unserializeResolver } from './resolver-processing/ResolverProcessor';
const { broadcastToAllKnownNodes } = require("./broadcast");
const showHelp = require("./Help");
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { buildSchema } from 'graphql';

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

    const dbResolvers = await Resolver.find();
    dbResolvers.forEach(resolver => {
        const r = unserializeResolver(resolver.serialized);
        globals.resolvers.push(r.root);
        globals.types.push(r.schema);
    });
    globals.mergedTypes = buildSchema(mergeTypes(globals.types, { all: true }) as any);
    globals.mergedResolvers = mergeResolvers(globals.resolvers as any);



    
}

(async () => {
    await setup();

    app.use("/", routes);

    app.listen(port, async () => {
        console.log(`Moracle HTTP API listening on ${myIP}:${port}!`);
    });
})();
