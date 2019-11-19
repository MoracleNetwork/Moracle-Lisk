/**
 * Note that some comments are taken directly from LIP5 here:
 * https://github.com/LiskHQ/lips/blob/master/proposals/lip-0005.md#interface
 */

const BaseModule = require("lisk-framework/src/modules/base_module");
const { createStorageComponent } = require("lisk-framework/src/components/storage");
const { createLoggerComponent } = require("lisk-framework/src/components/logger");
const MODULE_ALIAS = "MoracleChatter";
const MODULE_VERSION = "1.0.0";
const Manager = require("./Manager");
const globals = require('./globals');

// Exported from the main file of the JavaScript package
module.exports = class CustomModule extends BaseModule {
    /**
     * A unique module name accessed throughout out the system.
     * If some module has already been registered with the same alias, an error will be thrown.
     */

    constructor(options) {
        super(options);
        this.manager = null;
    }
    static get alias() {
        return MODULE_ALIAS;
    }

    static get info() {
        return {
            author: "Jonathan Gros-Dubois",
            version: MODULE_VERSION,
            name: MODULE_ALIAS
        };
    }

    /**
     * Supported configurations for the module with default values.
     */
    static get defaults() {
        return {};
    }

    /**
     * List of valid events to register with the Controller.
     * Once the application is running, each event name will be prefixed by the module's alias, e.g. `moduleName:event1`.
     * Any module running on the instance will be able to subscribe to these events.
     */
    get events() {
        return ["remoteEvent"];
    }

    /**
     * List of valid actions to register with the Controller.
     * Once the application is running, each action name will be prefixed by the module's alias, e.g. `moduleName:action1`.
     */
    get actions() {
        return {
            remoteEvent: {
                handler: async () => {
                    return 22;
                },
                isPublic: true
            },
            getVersion: {
                handler: async () => MODULE_VERSION,
                isPublic: true
            }
        };
    }

    /**
     * The method to be invoked by Controller to load the module.
     * Module developers should ensure that all loading logic is completed during the lifecycle of this method.
     * The Controller will emit an event `lisk:ready` which a module developer can use to perform some activities
     * which should be performed when every other module is loaded. Some activities which you want to perform when
     * every other module is loaded.
     *
     * @param {Channel} channel - An interface to a channel
     * @param {Object} options - An object of module options
     * @return {Promise<void>}
     */
    async load(channel) {
        console.log("REGISTERING MODULE");

        this.manager = new Manager(channel, this.options);
        globals.manager = this.manager;
        const express = require("express");
        const app = express();
        const port = 7893;

        channel.once("app:ready", async () => {
            await this.manager.bootstrap();
        });

        app.get("/", (req, res) => {
            channel.invoke("network:emit", {
                event: "MoracleChatter:remoteEvent",
                data: { msg: "hey there!" }
            });
            res.send(200);
        });
        if (process.argv[1] == "/Users/jacksonroberts/lisksdk-test/src/index2.js") {
            app.listen(port, () => console.log(`Example app listening on port ${port}!`));
        }
    }

    /**
     * The method to be invoked by the Controller to perform cleanup of the module.
     *
     * @return {Promise<void>}
     */
    async unload() {}
};
