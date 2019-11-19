/* This file declares two things:
    - The GraphQL schema that 
*/

const schema = `
type Query {
    getArbitraryURLContents(url: String!): String
}
`;

const mappings = {
    getArbitraryURLContents: "getArbitraryURLResolver.js"
};

module.exports = {schema, mappings};
