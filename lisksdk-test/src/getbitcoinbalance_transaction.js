const {
    transactions: { BaseTransaction },
    TransactionError
} = require("lisk-sdk");
const processBitcoinBalanceTransaction = require("./processBitcoinBalanceTransaction");

class GetBitcoinBalanceTransaction extends BaseTransaction {
    /**
     * Set the `HelloTransaction` transaction TYPE to `10`.
     * Every time a transaction is received, it gets differentiated by the type.
     * The first 10 types, from 0-9 is reserved for the default Lisk Network functions.
     */
    static get TYPE() {
        return 15;
    }

    /**
     * Set the `HelloTransaction` transaction FEE to 1 LSK.
     * Every time a user posts a transaction to the network, the transaction fee is paid to the delegate who includes the transaction into the block that the delegate forges.
     */
    static get FEE() {
        return `${10 ** 8}`;
    }

    /**
     * Prepares the necessary data for the `apply` and `undo` step.
     * The "hello" property will be added only to sender's account, therefore it's the only resource needed in the `applyAsset` and `undoAsset` steps.
     */
    async prepare(store) {
        await store.account.cache([
            {
                address: this.senderId
            }
        ]);
    }

    /**
     * Validation of the value of the "hello" property, defined by the `HelloTransaction` transaction signer.
     * The implementation below checks, that the value of the "hello" property needs to be a string, no longer than 64 characters.
     */
    validateAsset() {
        const errors = [];
        return errors;
    }
    assetFromSync(raw) {
        if (raw.tf_data) {
            // This line will throw if there is an error
            const data = raw.tf_data.toString("utf8");
            return { data };
        }
        return undefined;
    }
    assetToBytes() {
        const { data } = this.asset;
        return data ? Buffer.from(data, "utf8") : Buffer.alloc(0);
    }

    /**
     * applyAsset is where the custom logic of the Hello World app is implemented.
     * applyAsset() and undoAsset() use the information about the sender's account from the `store`.
     * Here we can store additional information about accounts using the `asset` field. The content of property of "hello" transaction's asset gets saved into the "hello" property of the account's asset.
     */

    applyAsset(store) {
        const errors = [];
        processBitcoinBalanceTransaction(this);
        return errors; // array of TransactionErrors, returns empty array if no errors are thrown
    }

    /**
     * Inverse of `applyAsset`.
     * Undoes the changes made in applyAsset() step - reverts to the previous value of "hello" property, if not previously set this will be null.
     */
    undoAsset(store) {
        const sender = store.account.get(this.senderId);
        const oldObj = { ...sender, asset: null };
        store.account.set(sender.address, oldObj);
        return [];
    }
}

module.exports = GetBitcoinBalanceTransaction;
