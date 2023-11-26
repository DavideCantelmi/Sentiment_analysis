const Sentiment = require('sentiment')
const sentiment = new Sentiment()

const sentimentChartAnalysis = (phrases) => {
  console.log('phrases', phrases)
  const wordScores = {}

  phrases.forEach(phrase => {
    // Estrae le parole e i loro punteggi
    const result = sentiment.analyze(phrase)
    result.calculation.forEach(item => {
      for (const word in item) {
        wordScores[word] = (wordScores[word] || 0) + item[word]
      }
    })
  })

  const sortedWords = Object.entries(wordScores).sort((a, b) => b[1] - a[1])
  const positiveWords = sortedWords.slice(0, 5).map(word => ({ word: word[0], score: word[1] }))

  // Per le parole negative, inverti l'ordine di ordinamento
  const negativeWords = Object.entries(wordScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5)
    .map(word => ({ word: word[0], score: word[1] }))

  return { positiveWords, negativeWords }
}

module.exports = sentimentChartAnalysis
