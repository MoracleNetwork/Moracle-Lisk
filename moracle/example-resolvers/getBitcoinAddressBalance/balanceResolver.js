(async () => {
    const a = args.address;
    const blockchainInfoResult = await asyncGet(`https://blockchain.info/rawaddr/${a}`)
    const blockCypherResult = await asyncGet(`https://api.blockcypher.com/v1/btc/main/addrs/${a}/balance`);
    if (blockchainInfoResult.final_balance == blockCypherResult.final_balance) {
        return blockchainInfoResult.final_balance;
    }
    return undefined;
})();