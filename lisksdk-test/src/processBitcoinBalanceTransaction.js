const globals = require("./modules/MoracleChatter/globals");
const MoracleClient = require("./modules/MoracleChatter/MoracleClient");

async function processBitcoinBalanceTransaction(tx) {
    const sender = tx.senderId;
    const asset = tx.asset;
    const moracleClient = new MoracleClient();
    const components = globals.manager.scope.components;

    const c = await moracleClient.moracleRequest(
        tx.id,
        `{
            getBitcoinAddressBalance(address: "${asset.btcAddress}")
        }`
    );
    if (c !== undefined) {
        components.storage.entities.Account.updateOne(
            { address: sender },
            {
                asset: { bitcoinAddressBalance: {amount: c.getBitcoinAddressBalance, address: asset.btcAddress } }
            }
        );
    }
}

module.exports = processBitcoinBalanceTransaction;
