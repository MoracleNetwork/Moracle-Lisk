/* eslint-disable no-undef */
(async () => {
    // args is magically populated with the query sent to the resolver.
    const rates =  await asyncGet('https://api.exchangeratesapi.io/latest');
    return rates.rates;
})();