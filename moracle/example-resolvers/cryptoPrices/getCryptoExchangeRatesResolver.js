/* eslint-disable no-undef */
(async () => {
    const lisk_price =  await asyncGet('https://api.coingecko.com/api/v3/simple/price?ids=lisk&vs_currencies=USD');
    return {
        lisk: lisk_price.lisk.usd
    }
})();