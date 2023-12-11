function fetchSentimentData () {
  const inputElement = document.getElementById('barra-ricerca') // prendo la barra di ricerca dal DOM
  const resultElement = document.getElementById('result') // prendo dal dom il div che contiene l'id "result"
  const searchTerm = inputElement.value // inputElement è l'oggetto relativo a barra di ricerca, di esso mi prendo il value
  const apiUrl = `http://localhost:3030/sentiment?searchTerm=${searchTerm}` // chiamo il backend, mettendo come parametro il valore
  const searchTermDisplay = document.getElementById('searchTermDisplay') // prendo dal dom il div che contiene l'id "searchTermDisplay"
  const sentimentDisplay = document.getElementById('sentimentDisplay') // prendo dal dom il div che contiene l'id "sentimentDisplay"
  const scoreDisplay = document.getElementById('scoreDisplay') // prendo dal dom il div che contiene l'id "scoreDisplay"
  const confidenceDisplay = document.getElementById('confidenceDisplay') // prendo dal dom il div che contiene l'id "confidenceDisplay"

  fetch(apiUrl) // faccio il fetch dei risultati (prendo i dati dal backend)
    .then((response) => response.json()) // inanzitutto prendo la risposta e la converto in json
    .then((data) => { // ricorda che i "then" sono ASINCRONI, hanno una funzione simile a await.
      searchTermDisplay.innerHTML = `<p style="font-size: 1.5em;">Parola/Frase: <strong>${searchTerm}</strong></p>`
      // Manipola i dati ricevuti e mostrali nella pagina

      resultElement.style.display = 'block' // mostro il risultato, che prima era nascosto.
      // block è un tipo di display che fa si che l'elemento occupi tutto lo spazio disponibile.

      // a questo punto parte uno switch case che in base al sentiment cambia il colore del testo
      // fai attenzione al fatto che il sentiment è in minuscolo.
      // qualora fosse scritto in maiuscolo io lo forzo in minuscolo con "toLowerCase()"
      // data è la risposta del backend.
      // al suo interno c'è l'attributo sentiment che contiene il sentiment
      switch (data.sentiment.toLowerCase()) {
        case 'positive': // in caso in cui ci sia scritto positive.
          sentimentDisplay.style.color = 'green' // cambio il colore del testo in verde
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Positivo 😊</p>' // imposto questa linea all'html
          break
        case 'negative': // in caso negativo
          sentimentDisplay.style.color = 'red' // cambio il colore del testo in rosso
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Negativo 😞</p>' // imposto questa linea all'html
          break
        case 'neutral': // caso neutrale
          sentimentDisplay.style.color = '#ffd700' // cambio il colore del testo in giallo
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Neutrale 😌</p>' // imposto questa linea all'html
          break
      }

      const languageEmoji = getLanguageEmoji(data.language.toLowerCase()) // prendo la lingua dal data.
      sentimentDisplay.style.color = 'black' // cambio il colore del testo in nero
      sentimentDisplay.innerHTML += `<p style="font-size: 1.5em;">Lingua: ${languageEmoji}</p>`
      // imposto questa linea all'html
      confidenceDisplay.innerHTML = `<p style="font-size: 1.5em;">Confidence: <strong>${data.confidence.toFixed(
          2
        )}</strong></p>`
      // imposto questa linea all'html, toFixed(2) serve per arrotondare a due cifre decimali il risultato numerico
      // della confidence.

      const confidenceProgressBar = `
        <div class = "progress mt-3" style="height: 25px;">
          <div
          class="progress-bar"
          role="progressbar"
          style="width: ${data.confidence}%; background-color: #4CAF50;"
          aria-valuenow="${data.confidence}"
          aria-valuemin="0"
          aria-valuemax="100"
          >
          ${data.confidence.toFixed(2)}%
          </div>
        </div>`
      // serve per graficare la barra della confiidence. è un css

      sentimentDisplay.innerHTML += confidenceProgressBar // maggiungo quella stringa all'html (c'è il +=)

      const score = data.score // prendo il punteggio dai dati
      let scoreColor = '' // lo score color inizialmente è vuoto
      if (score >= 0 && score < 30) {
        scoreColor = 'red' // se lo score è tra 0 e 30, allora lo score color è rosso
      } else if (score >= 30 && score < 70) {
        scoreColor = 'yellow' // se lo score è tra 30 e 70, allora lo score color è giallo
      } else {
        scoreColor = 'green' // se lo score è tra 70 e 100, allora lo score color è verde
      }

      scoreDisplay.innerHTML = `<p style="font-size: 1.5em; color: ${scoreColor};">Score: <strong>${score}</strong></p>`
      // imposto allo scoreDisplay questa riga che mi dice lo score e lo colora in base al colore che ho scelto prima.
    })
    .catch((error) => { // in caso di errore
      console.log(error) // stampo l'errore
      resultElement.innerHTML =
          '<p>Si è verificato un errore durante la richiesta dei dati.</p>' // imposto invece questa stringa all'html
    })
}

// prendo il form dal sentiment
const sentimentForm = document.getElementById('sentiment-form')
sentimentForm.addEventListener('submit', function (event) { // aggiungo il listener
  event.preventDefault() // prevengo l'evento di default
  fetchSentimentData() // chiamo la funzione fetchSentimentData
})

function getLanguageEmoji (language) { // chiamo questa funzione dall'altra parte
  const languageMap = {
    // come noti è un oggetto mappato con una sigla che è quella che mi ritorna l'api
    // e a destra l'emoji della bandiera.
    en: '🇺🇸', // English
    it: '🇮🇹', // Italian
    fr: '🇫🇷', // French
    es: '🇪🇸', // Spanish
    de: '🇩🇪', // German
    ja: '🇯🇵', // Japanese
    zh: '🇨🇳', // Chinese
    ko: '🇰🇷', // Korean
    ar: '🇸🇦', // Arabic
    ru: '🇷🇺', // Russian
    hi: '🇮🇳', // Hindi
    pt: '🇵🇹', // Portuguese
    nl: '🇳🇱', // Dutch
    sv: '🇸🇪', // Swedish
    tr: '🇹🇷', // Turkish
    he: '🇮🇱', // Hebrew
    th: '🇹🇭', // Thai
    el: '🇬🇷', // Greek
    pl: '🇵🇱', // Polish
    cs: '🇨🇿', // Czech
    hu: '🇭🇺', // Hungarian
    fi: '🇫🇮', // Finnish
    da: '🇩🇰', // Danish
    no: '🇳🇴', // Norwegian
    id: '🇮🇩', // Indonesian
    vi: '🇻🇳', // Vietnamese
    ro: '🇷🇴', // Romanian
    sk: '🇸🇰', // Slovak
    bg: '🇧🇬', // Bulgarian
    uk: '🇺🇦', // Ukrainian
    hr: '🇭🇷', // Croatian
    sr: '🇷🇸' // Serbian
  }

  return languageMap[language] || '🏴' // se non trova nulla mette la bandiera nera qui a destra
  // languageMap[language] vuol dire che prendo la proprietà relativa al language che gli passo
}
