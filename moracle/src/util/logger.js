const globals = require("../globals");

function verboseLog(...args) {
    if (globals.verboseLogging) {
        console.log(args);
    }
}

module.exports = verboseLog;
