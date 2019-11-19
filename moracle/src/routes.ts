const express = require("express");
const router = express.Router();
import globals from "./globals";
const { createIdentityRequestResponse } = require("./IdentityRequest");
import { sendNewPeerNotification } from "./NewPeerNotification";
import MoracleMessage from "./MoracleMessage";
import { version } from './version';
import { Resolver } from './entities/Resolver';
import { StoredResult } from './entities/StoredResult';
import { createConnection } from "typeorm";
import { graphql } from "graphql";


export interface AuthFailed {
    'message': string;
}



router.get("/versioncheck", function (req, res) {
    console.log(`Got version check. `);
    res.send(version);
});


router.post("/msg", function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});

router.post("/rpc", function (req, res) {
    if (req.connection.remoteAddress == '::1') {
        console.log(req.body);
    }
    console.log(globals.types);
    res.sendStatus(200);
});
router.post('/moraclerequest', async function (req, res) {
    const query = req.body.query;
    const id = req.body.txId;
    if (id !== undefined) {
        const storedResults = await StoredResult.findOne({ txId: id });
        if (storedResults !== undefined) {
            res.send(JSON.parse(storedResults.serializedResult));
            return;
        }
    }
    graphql(globals.mergedTypes, query, globals.mergedResolvers).then((response) => {
        if (id !== undefined) {
            const s = new StoredResult();
            s.serializedResult = JSON.stringify(response);
            s.txId = id;
            s.save();
        }
        res.send(response);
        return;
    });
});

export default router;
