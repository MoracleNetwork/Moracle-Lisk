require('source-map-support').install();
const { Application, genesisBlockDevnet } = require('lisk-sdk'); 
const configDevnet = require('./config.json');
const WeatherTransaction = require('./weather_transaction');
const DollarAmountTransaction = require('./dollar_amount_transaction');

const MoracleChatterModule = require('./modules/MoracleChatter');

configDevnet.app.label = 'hello-world-blockchain-app'; 
configDevnet.components.storage.database = 'lisk_dev';
configDevnet.components.storage.user = 'jacksonroberts'; 
configDevnet.components.storage.password = ''; 
configDevnet.modules.http_api.httpPort = 4000; 

const app = new Application(genesisBlockDevnet, configDevnet); 
app.registerTransaction(WeatherTransaction); 
app.registerTransaction(DollarAmountTransaction); 
app.registerModule(MoracleChatterModule);

app 
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });