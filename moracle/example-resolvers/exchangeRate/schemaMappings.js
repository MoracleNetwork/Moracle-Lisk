/* This file declares two things:
    - The GraphQL schema that 
*/

const schema = `
type ExchangeRateResults {
    CAD: Float
    HKD: Float
    ISK: Float
    PHP: Float
    DKK: Float
    HUF: Float
    CZK: Float
    AUD: Float
    RON: Float
    SEK: Float
    IDR: Float
    INR: Float
    BRL: Float
    RUB: Float
    HRK: Float
    JPY: Float
    THB: Float
    CHF: Float
    SGD: Float
    PLN: Float
    BGN: Float
    TRY: Float
    CNY: Float
    NOK: Float
    NZD: Float
    ZAR: Float
    USD: Float
    MXN: Float
    ILS: Float
    GBP: Float
    KRW: Float
    MYR: Float
}
type Query {
    getExchangeRates: ExchangeRateResults
}
`;

const mappings = {
    getExchangeRates: "getExchangeRatesResolver.js"
};

module.exports = {schema, mappings};
