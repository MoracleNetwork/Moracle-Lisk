import { ResolverFunctionSandbox } from "./sandbox";
import { Resolver } from '../entities/Resolver';
import fs from 'fs';

// actual resolver root for GraphQL resolver
export interface MoracleResolverRoot {
    [key: string]: (args: any) => Promise<any>
}
// the script sources for serialization
export interface MoracleResolverRootSources {
    [key: string]: string
}

export interface MoracleResolverSerializable {
    name: string;
    schema: string;
    rootSources: MoracleResolverRootSources;
}
export interface MoracleResolver extends MoracleResolverSerializable {
    root: MoracleResolverRoot;
}


export function processResolver(folderName: string): MoracleResolver {
    const schemaMappings = require(`../../example-resolvers/${folderName}/schemaMappings.js`);
    const rootFiles = schemaMappings.mappings;
    const resolverRoot: MoracleResolverRoot = {};
    const resolverRootSources: MoracleResolverRootSources = {}
    Object.keys(rootFiles).forEach(e => {
        const contents = fs.readFileSync(`../../example-resolvers/${folderName}/${rootFiles[e]}`).toString('utf-8');
        resolverRoot[e] = async (args) => {
            return (new ResolverFunctionSandbox(contents).run(args));
        }
        resolverRootSources[e] = contents;
    });
    return {
        name: folderName,
        schema: schemaMappings.schema,
        root: resolverRoot,
        rootSources: resolverRootSources
    }
}

export function serializeResolver(resolver: MoracleResolver) {
    const serializableResolverData: MoracleResolverSerializable = {
        name: resolver.name,
        schema: resolver.schema,
        rootSources: resolver.rootSources
    }
    return JSON.stringify(serializableResolverData);
}

export async function serializeAndSaveResolver(resolver: MoracleResolver) {
    const serializedResolver = serializeResolver(resolver);
    const r = new Resolver();
    r.name = resolver.name;
    r.serialized = serializedResolver;
    const c = await r.save();
}

export function unserializeResolver(serializedResolver: string): MoracleResolver {
    const r: MoracleResolverSerializable = JSON.parse(serializedResolver);
    const resolver = {
        name: r.name,
        schema: r.schema,
        rootSources: r.rootSources,
        root: {}
    }
    Object.keys(resolver.rootSources).forEach((e) => {
        resolver.root[e] = async (args) => {
            return (new ResolverFunctionSandbox(resolver.rootSources[e]).run(args));
        };
    });

    return resolver;
}