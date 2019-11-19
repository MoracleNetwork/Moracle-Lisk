/* This file declares two things:
    - The GraphQL schema that 
*/

const schema = `
type CryptoExchangeRateResults {
    lisk: Float
}
type Query {
    getCryptoExchangeRates: CryptoExchangeRateResults
}
`;

const mappings = {
    getCryptoExchangeRates: "getCryptoExchangeRatesResolver.js"
};

module.exports = {schema, mappings};
