import { buildSchema, graphql } from 'graphql';
import { processResolver, MoracleResolver, serializeResolver, unserializeResolver, serializeAndSaveResolver } from './ResolverProcessor';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { createConnection } from 'typeorm';
import { Resolver } from '../entities/Resolver';

// This file is intended to be executed directly and serves as a demo for schema merging. 
(async () => {
    await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "brianoates",
        password: "",
        database: "moracle",
        entities: ["../entities/**/*.js"],
        migrations: ["../migration/**/*.js"]
    });

    // Construct a schema, using GraphQL schema language
    const resolver: MoracleResolver = processResolver('getArbitraryURL');
    const exchangeResolver = processResolver('exchangeRate');
    const weatherResolver = processResolver('currentWeather');
    const cryptoExchangeResolver = processResolver('cryptoPrices');

    const resolvers_to_serialize = [
        resolver,
        exchangeResolver,
        weatherResolver,
        cryptoExchangeResolver
    ];
    resolvers_to_serialize.forEach(e => {
        serializeAndSaveResolver(e);
    });

    console.log('saved to db');
    return;
    /*
    const types = [
        resolver.schema,
        exchangeResolver.schema,
        weatherResolver.schema,
    ]
    const resolvers = [
        resolver.root,
        exchangeResolver.root,
        weatherResolver.root
    ];

    const query = `{
    getExchangeRates {
        USD
        JPY
        CHF
    }
    getArbitraryURLContents(url: "http://iamawesome.com")

    getCurrentTemperature(lat: 40.014984, long: -105.270546)
}`;

    const mergedSchema = buildSchema(mergeTypes(types, { all: true }) as any);
    const mergedResolvers = mergeResolvers(resolvers as any);

    graphql(mergedSchema, query, mergedResolvers).then((response) => {
        console.log(response);
    });
    */

})();

