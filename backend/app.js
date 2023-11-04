const express = require('express')
const app = express()
const port = 3030
const cors = require('cors')
const bodyParser = require('body-parser')
const sentimentFetch = require('./sentimentFetch')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sentiment', async (req, res) => {
  try {
    const { text } = req.query
    const sentiment = await sentimentFetch(text)
    res.json(sentiment)
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, () => {
  console.log(`Sentiment app listening on http://localhost:${port}`)
}
)
