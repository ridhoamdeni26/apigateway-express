const axios = require('axios');

const { TIMEOUT } = process.env;

// ketika parsing dari env itu hasilnya string
module.exports = (baseUrl) => {
    return axios.create({
      baseURL: baseUrl,
      timeout: parseInt(TIMEOUT)
    });
  }