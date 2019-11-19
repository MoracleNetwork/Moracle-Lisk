function showHelp() {
    console.log("\n    Options:\n    -n <string> : Sets node name (required)\n    -p <number> : Sets node port (default 7892)\n    --maxConnections <number> : Sets the maximum number of psuedo connections.\n    --localhost : sets your IP to 127.0.0.1 instead of your public IP.\n    --verbose : Verbose logging.\n    --bootstrap : Find peers through a bootstrap node.\n    --connect <string> : Use a single bootstrap node. Only takes effect if --bootstrap is true\n    --help : shows this message.\n    ");
}
module.exports = showHelp;
//# sourceMappingURL=Help.js.map