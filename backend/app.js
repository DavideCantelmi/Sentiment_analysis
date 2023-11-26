const express = require('express')
const app = express()
const port = 3030
const cors = require('cors')
const bodyParser = require('body-parser')
const sentimentFetch = require('./sentimentFetch')
const sentimentChartAnalysis = require('./sentimentChartAnalysis')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sentiment', async (req, res) => {
  try {
    const text = req.query.searchTerm
    const sentiment = await sentimentFetch(text)
    console.log('sentiment', sentiment)
    res.send(sentiment)
  } catch (error) {
    console.error(error)
  }
})

app.post('/sentiment/chart', async (req, res) => {
  try {
    const text = req.body.phrases
    const sentiment = sentimentChartAnalysis(text)
    console.log('sentiment', sentiment)
    res.send(sentiment)
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, () => {
  console.log(`Sentiment app listening on http://localhost:${port}`)
}
)
