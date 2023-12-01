// il commento successivo disabilita dal linter il fatto che non usiamo esplicitamente dotenv.
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
// dotenv abilita la capacità di leggere variabili d'ambiente da file appositi chiamati .env
const configuration = {
  port: process.env.PORT || 3030,
  api: {
    apiKey: process.env.APIKEY || 'qturOizQKUbFM6bJeohmrnFGw1BGa3Cn', // i parametri a destra sono i default
    host: process.env.HOST || 'https://api.apilayer.com/sentiment/analysis'
  }
}

module.exports = configuration
