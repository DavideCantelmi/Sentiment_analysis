const Sentiment = require('sentiment')
// è un pacchetto node che getisce il sentiment analysis
const sentiment = new Sentiment()

const sentimentChartAnalysis = (phrases) => {
  // prendo un array di frasi.
  console.log('phrases', phrases)
  // inizio a memorizzare queste frasi in un oggetto.
  // l'oggetto sarà formato in questo modo
  // parola : punteggio, parola2 : punteggio, parola3: punteggio
  const wordScores = {}

  phrases.forEach(phrase => {
    // per ogni frase.
    // Estrae le parole e i loro punteggi
    const result = sentiment.analyze(phrase)
    // questa funzione utilizza l'istanza di sentiment di dichiarata a riga 2 e poi la analizza creando dei risultati
    result.calculation.forEach(item => {
      // i risultati sono immagazzinati in un array di oggetti, e ogni oggetto presenta la proprietà calculation
      for (const word in item) {
        // per ogni parola che trovo
        wordScores[word] = (wordScores[word] || 0) + item[word]
        // il punteggio di quella parola (notare la struttura wordScores[word] )
        // sarà uguale al punteggio che aveva prima (wordScores[word] || 0)
        // più il punteggio che ha ora (item[word])
      }
    })
  })

  // ordino le parole per punteggio.
  const sortedWords = Object.entries(wordScores).sort((a, b) => b[1] - a[1])
  // prendo le prime cinque e mappo in un json del tipo parola: word[0] contiene la parola, punteggio: word[1] contiene il punteggio
  const positiveWords = sortedWords.slice(0, 5).map(word => ({ word: word[0], score: word[1] }))

  // Per le parole negative, inverto l'ordine di ordinamento
  // prendo wordscores e inverto l'ordine.
  const negativeWords = Object.entries(wordScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5)
    .map(word => ({ word: word[0], score: word[1] }))

  // restituisco un json le parole positive incapsulate in positiveWords, le parole negative in negativeWords

  // risultato:
  /*
  {
    positiveWords: [ { word: 'love', score: 3 }, { word: 'welcome', score: 2 } ],
    negativeWords: [ { word: 'welcome', score: 2 }, { word: 'love', score: 3 } ]
  }
  */
  return { positiveWords, negativeWords }
}

module.exports = sentimentChartAnalysis
