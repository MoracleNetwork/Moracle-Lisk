const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); 
const WeatherTransaction = require('./weather_transaction');
const MoracleChatterModule = require('./modules/MoracleChatter');
const DollarAmountTransaction = require('./dollar_amount_transaction');

configDevnet.app.label = 'hello-world-blockchain-app2'; 
configDevnet.components.storage.database = 'lisk_dev2';
configDevnet.components.storage.user = 'jacksonroberts'; 
configDevnet.components.storage.password = ''; 
configDevnet.modules.http_api.httpPort = 4001; 
configDevnet.modules.network.wsPort = 5001;

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