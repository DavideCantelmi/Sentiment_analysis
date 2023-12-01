const configuration = require('./configuration') // richiedo la configurazione
// funzione asincrona utilizzata nell'app.js
const sentimentFetch = async (text) => {
  // prendo il testo (text) presumibilmente prelevato dalla searchBar
  const myHeaders = new Headers()
  // creo gli headers. Gli headers sono delle intestazioni che contengono dei metadati che vengono passati
  // al momento della chiamata, ad esempio delle stringhe di autenticazione.
  myHeaders.append('apikey', configuration.api.apiKey)
  // aggiungo agli header l'apikey.
  console.log('text', text)
  if (text.startsWith('#')) {
    text = text.substring(1)
  } // questa sezione toglie l'hashtag se presente.
  const raw = JSON.stringify(text) // l'api vuole il testo in formato json quindi lo converto
  console.log('la parola è: ', raw)

  // creo la richiesta.
  const requestOptions = {
    method: 'POST', // il metodo
    headers: myHeaders,
    body: raw
  }

  // tramite la funzione fetch, chiamo l'api esterna e gli mando la richiesta costruita precedentemente
  const response = await fetch(configuration.api.host, requestOptions)
  // aspetto la risposta e la salvo in response
  const result = await response.json()
  // la ritorno.
  return result
}

module.exports = sentimentFetch
