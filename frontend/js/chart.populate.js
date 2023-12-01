/* eslint-disable no-unused-vars */
function analyzeSentiment () {
  const frasi = document.getElementById('frasi').value.split('\n')
  fetch('http://localhost:3030/sentiment/chart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrases: frasi })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText)
      }
      return response.json()
    })
    .then(data => {
      displayResults(data)
    })
    .catch(error => {
      console.error('Errore:', error)
      alert('Si è verificato un errore: ' + error.message)
    })
}

function displayResults (data) {
  const { positiveWords, negativeWords } = data
  const resultDiv = document.getElementById('result')
  resultDiv.innerHTML = ''

  const section = (title, words, className) => {
    if (words.length > 0) {
      return `<div class="result-section">
                <h3>${title}:</h3>
                <ul class="result-list">
                    ${words.map(word => `<li class="${className}">${word.word} <span class="score">${word.score}</span></li>`).join('')}
                </ul>
              </div>`
    }
    return ''
  }

  const positiveSection = section('Parole Positive', positiveWords, 'positive')
  const negativeSection = section('Parole Negative', negativeWords, 'negative')

  if (positiveSection) {
    resultDiv.innerHTML += positiveSection
  }

  if (negativeSection) {
    resultDiv.innerHTML += negativeSection
  }

  if (!positiveSection && !negativeSection) {
    resultDiv.innerHTML = '<div class="no-results">Nessuna parola trovata</div>'
  }
}
