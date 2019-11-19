function showHelp() {
    console.log(`
    Options:
    -n <string> : Sets node name (required)
    -p <number> : Sets node port (default 7892)
    --maxConnections <number> : Sets the maximum number of psuedo connections.
    --localhost : sets your IP to 127.0.0.1 instead of your public IP.
    --verbose : Verbose logging.
    --bootstrap : Find peers through a bootstrap node.
    --connect <string> : Use a single bootstrap node. Only takes effect if --bootstrap is true
    --help : shows this message.
    `);
}

module.exports = showHelp;