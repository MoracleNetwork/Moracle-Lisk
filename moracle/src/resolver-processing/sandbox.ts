import { VM } from 'vm2';
const axios = require('axios');
var { graphql, buildSchema } = require('graphql');


export class ResolverFunctionSandbox {
    vm: VM;
    functionText: string;

    // Sandbox methods
    static async asyncGet(url, params) {
        const result = await axios.get(url, { params: params });
        return result.data;
    }

    constructor(functionText: string) {
        this.functionText = functionText;
    }
    run(args) {
        this.vm = new VM({
            timeout: 5000,
            sandbox: {
                asyncGet: ResolverFunctionSandbox.asyncGet,
                args: args
            }
        });
        return this.vm.run(this.functionText);
    }
}

