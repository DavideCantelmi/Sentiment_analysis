// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const configuration = {
  port: process.env.PORT || 3000,
  api: {
    apiKey: process.env.APIKEY || 'qturOizQKUbFM6bJeohmrnFGw1BGa3Cn',
    host: process.env.HOST || 'https://api.apilayer.com/sentiment/analysis'
  }
}

module.exports = configuration
