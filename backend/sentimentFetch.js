const configuration = require('./configuration')
const sentimentFetch = async (text) => {
  const myHeaders = new Headers()
  myHeaders.append('apikey', configuration.api.apiKey)

  const raw = JSON.stringify(text)
  console.log('la parola è: ', raw)
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: raw
  }

  const response = await fetch(configuration.api.host, requestOptions)
  const result = await response.json()
  return result
}

module.exports = sentimentFetch
