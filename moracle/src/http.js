const axios = require("axios");

async function get(nodeIP, path, params) {
    return await axios.get(`http://${nodeIP}${path}`, { params: params });
}

async function post(nodeIP, path, data) {
    return await axios.post(`http://${nodeIP}${path}`, data);
}

module.exports = { get, post };
