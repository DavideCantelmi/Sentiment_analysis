const axios = require('axios')
const configuration = require('./configuration')
const sentimentFetch = async (text) => {
  const options = {
    method: 'GET',
    url: 'https://sentiment-analysis.p.rapidapi.com/sentiment-2.1',
    params: {
      lang: 'en',
      txt: text,
      model: 'general',
      dm: 's',
      sdg: 'l',
      txtf: 'plain',
      of: 'json',
      uw: 'n',
      rt: 'n',
      egp: 'n'
    },
    headers: {
      Accept: 'application/json',
      'X-RapidAPI-Key': configuration.rapidAPI['X-RapidAPI-Key'],
      'X-RapidAPI-Host': configuration.rapidAPI['X-RapidAPI-Host']
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports = sentimentFetch
