const globals = require("./modules/MoracleChatter/globals");
const MoracleClient = require("./modules/MoracleChatter/MoracleClient");
const { BigNum } = require("lisk-sdk");
const transactions = require("@liskhq/lisk-transactions");

async function processDollarAmountTransaction(tx) {
    const sender = tx.senderId;
    const asset = tx.asset;
    const moracleClient = new MoracleClient();
    const components = globals.manager.scope.components;

    const c = await moracleClient.moracleRequest(
        tx.id,
        `{
            getCryptoExchangeRates {
                lisk
            }
        }`
    );

    if (c !== undefined) {
        //const recipientAccount = await components.storage.entities.Account.get({ address: tx.recipientId }, { extended: true, limit: 1 });
        const recipientAccount = await components.storage.entities.Account.get({ address: tx.recipientId }, { extended: true, limit: 1 });
        const senderBalance = new BigNum(recipientAccount[0].balance);
        const liskForDollarAmount = asset.amount / c.getCryptoExchangeRates.lisk;
        let amountToAdd = new BigNum(Math.floor(10 ** 8 * liskForDollarAmount));
        let newAmount = senderBalance.add(amountToAdd);

        components.storage.entities.Account.updateOne(
            { address: tx.recipientId },
            {
                balance: newAmount.toString()
            }
        );
    }
}

module.exports = processDollarAmountTransaction;
