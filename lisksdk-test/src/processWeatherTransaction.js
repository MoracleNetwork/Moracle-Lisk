const globals = require("./modules/MoracleChatter/globals");
const MoracleClient = require("./modules/MoracleChatter/MoracleClient");

async function processWeatherTransaction(tx) {
    const sender = tx.senderId;
    const asset = tx.asset;
    const moracleClient = new MoracleClient();
    const components = globals.manager.scope.components;

    const c = await moracleClient.moracleRequest(
        tx.id,
        `{
            getCurrentTemperature(lat: ${asset.lat}, long: ${asset.long})
        }`
    );
    if (c !== undefined) {
        components.storage.entities.Account.updateOne(
            { address: sender },
            {
                asset: { currentTemp: c.getCurrentTemperature }
            }
        );
    }
}

module.exports = processWeatherTransaction;
