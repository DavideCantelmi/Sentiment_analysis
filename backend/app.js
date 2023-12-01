// questo è il cuore dell'applicazione
const express = require('express') // gestisce le rotte.
const app = express() // avvio una app di express
const configuration = require('./configuration') // richiedo la configurazione
const port = configuration.port // importo la porta da configuration
const cors = require('cors') // richiedo il pacchetto che gestisce la chiamate tra server diversi
const bodyParser = require('body-parser') // trasforma i dati del body in un altro formato
// queste le vediamo dopo
const sentimentFetch = require('./sentimentFetch')
const sentimentChartAnalysis = require('./sentimentChartAnalysis')

// l'applicazione deve usare le cors e il bodyParser in modo
app.use(cors())
app.use(bodyParser.json()) // trasforma in json

// endpoint di prova, per verificare che l'applicazione funzioni
app.get('/', (req, res) => {
  res.send('Hello World!')
}) // quando arriva una richiesta GET su /, rispondi con "Hello World!"

// rotta /sentiment, è una get
app.get('/sentiment', async (req, res) => {
  // quando uso funzioni asincrone è sempre meglio incapsulare tutto in un try catch.
  try {
    // prendo dalla query (in pratica quando in un indirizzo fai una cosa del tipo ?q=qualcosa) il valore
    // di searchTerm.
    // in pratica l'indirizzo sarà nella forma http://localhost:3030/sentiment?searchTerm=qualcosa
    const text = req.query?.searchTerm
    // chiamo la funzione sentimentFetch che è asincorna e torna dei dati che poi vedremo.
    const sentiment = await sentimentFetch(text)
    console.log('sentiment', sentiment)
    /*
    {
      sentiment: 'neutral',
      score: 2,
      confidence: 30.000001192092896,
      language: 'it',
      content_type: 'text',
    }

    */
    // li mando come json come  risposta. Quando devo mandare una risposta al client uso sempre res.send
    res.send(sentiment)
  } catch (error) {
    // per qualsiasi errore che si verifica, lo stampo in console
    console.error(error)
  }
})

app.post('/sentiment/chart', async (req, res) => {
  // endpoint che gestisce la classifica. In questo caso il client manda i dati nel body della richiesta
  try {
    // cerco nel body l'attributo PHRASES che contiene un ARRAY DI PAROLE.
    const text = req.body.phrases
    // passo l'array alla funzione sentimentChartAnalysis.
    const sentiment = sentimentChartAnalysis(text)
    // che restituirà un oggetto che vedremo.
    console.log('sentiment', sentiment)
    // lo mando al client con res.send
    res.send(sentiment)
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, () => {
  console.log(`Sentiment app listening on http://localhost:${port}`)
})
