const axios = require("axios");

const processChatter = ({ components, channel, config }, logger) => {
    channel.subscribe("network:event", event => {
        processEvent(event);
        return;
    });
    channel.subscribe("chain:blocks:change", event => {

    });
};

function processEvent(event, data) {
    if (event == "MoracleChatter:remoteEvent") {
        axios.post("http://127.0.0.1:7892/msg", data).catch(error => {
            console.log(error.response);
        });
        console.log(data);
    }
}

module.exports = processChatter;
