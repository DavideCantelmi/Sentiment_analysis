/* eslint-disable no-unused-vars */
function analyzeSentiment () {
  const frasi = document.getElementById('frasi').value.split('\n') // prendo le frasi dal DOM e le divido in un array
  fetch('http://localhost:3030/sentiment/chart', {
    // chiamo il backend, questa volta parametrizzo la chiamata per renderla più efficiente
    method: 'POST', // specifico il metodo
    headers: { 'Content-Type': 'application/json' }, // specifico gli headers (si fa sempre)
    body: JSON.stringify({ phrases: frasi }) // metto nel body le parole con il tag phrases che serve al backend
    // stringify converte l'oggetto javascript in una stringa json
  })
    .then(response => { // se la risposta arriva. (then è asincrono)
      if (!response.ok) { // se non è un codice positivo (tipo 200, 201) ma uno di errore (400, 401 ecc..)
        throw new Error('Network response was not ok: ' + response.statusText)
      // lancio un errore
      }
      return response.json() // altrimenti ritorno la risposta.
    })
    .then(data => { // successivamente prendo i dati e li manipolo
      displayResults(data) // chiamo la funzione displayResults
    })
    .catch(error => { // ma se c'è un errore
      console.error('Errore:', error) // lo stampo in console
      alert('Si è verificato un errore: ' + error.message) // e mando un alert
    })
}

function displayResults (data) { // funzione displayResults
  const { positiveWords, negativeWords } = data // prendo le positiveWords e le negativeWords dal data (VEDI BACKEND)
  const resultDiv = document.getElementById('result') // prendo il div dal DOm
  resultDiv.innerHTML = '' // imposto inizialmente nullo l'html

  const section = (title, words, className) => {
    // dichiaro una sezione come una arrow function che prende come parametri title, words, className
    // title è il titolo della sezione, words sono le parole, className è la classe che avrà il testo
    // in base al tipo di parola (positiva o negativa)
    // words è un array di oggetti che contiene le parole e il punteggio
    // className è una stringa che può essere "positive" o "negative"
    if (words.length > 0) {
      // se la lunghezza delle parole è maggiore di 0
      return `<div class="result-section">
                <h3>${title}:</h3>
                <ul class="result-list">
                    ${words.map(word => `<li class="${className}">${word.word} <span class="score">${word.score}</span></li>`).join('')}
                </ul>
              </div>`
    } // ritorno questo html e quindi lo assiocio a section
    return '' // altrimenti tornerò una stringa vuota.
  }

  const positiveSection = section('Parole Positive', positiveWords, 'positive')
  // positiveSection sarà la sezione con cui metto come parametro importante la "positiveWords"
  const negativeSection = section('Parole Negative', negativeWords, 'negative')
  // negativeSection sarà il contrario.

  if (positiveSection) { // se positive section NON E' VUOTO
    resultDiv.innerHTML += positiveSection // aggiungo positiveSection all'html
  }

  if (negativeSection) { // se negative section NON E' VUOTO
    resultDiv.innerHTML += negativeSection // aggiungo negativeSection all'html
  }

  if (!positiveSection && !negativeSection) { // se entrambi sono vuoti
    resultDiv.innerHTML = '<div class="no-results">Nessuna parola trovata</div>'
    // aggiungo questo html all'html
  }
}
