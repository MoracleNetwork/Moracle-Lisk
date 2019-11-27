const schema = `
type Query {
    getBitcoinAddressBalance(address: String!): Int
}
`;

const mappings = {
    getBitcoinAddressBalance: "balanceResolver.js"
};

module.exports = {schema, mappings};
