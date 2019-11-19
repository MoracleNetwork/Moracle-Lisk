var globals = require("../globals");
function verboseLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (globals.verboseLogging) {
        console.log(args);
    }
}
module.exports = verboseLog;
//# sourceMappingURL=logger.js.map