/* This file declares two things:
    - The GraphQL schema that 
*/

const schema = `
type Query {
    getCurrentTemperature(lat: Float, long: Float): Float
}
`;

const mappings = {
    getCurrentTemperature: "getCurrentTemperatureResolver.js"
};

module.exports = {schema, mappings};
