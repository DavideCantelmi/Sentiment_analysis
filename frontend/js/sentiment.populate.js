function fetchSentimentData () {
  const inputElement = document.getElementById('barra-ricerca')
  const resultElement = document.getElementById('result')
  const searchTerm = inputElement.value
  const apiUrl = `http://localhost:3030/sentiment?searchTerm=${searchTerm}`
  const searchTermDisplay = document.getElementById('searchTermDisplay')
  const sentimentDisplay = document.getElementById('sentimentDisplay')
  const scoreDisplay = document.getElementById('scoreDisplay')
  const confidenceDisplay = document.getElementById('confidenceDisplay')

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      searchTermDisplay.innerHTML = `<p style="font-size: 1.5em;">Parola/Frase: <strong>${searchTerm}</strong></p>`

      resultElement.style.display = 'block'

      switch (data.sentiment.toLowerCase()) {
        case 'positive':
          sentimentDisplay.style.color = 'green'
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Positivo 😊</p>'
          break
        case 'negative':
          sentimentDisplay.style.color = 'red'
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Negativo 😞</p>'
          break
        case 'neutral':
          sentimentDisplay.style.color = '#ffd700'
          sentimentDisplay.innerHTML =
              '<p style="font-size: 1.5em;">Sentiment: Neutrale 😌</p>'
          break
        default:
          // Handle other cases if needed
          break
      }

      const languageEmoji = getLanguageEmoji(data.language.toLowerCase())
      sentimentDisplay.style.color = 'black'
      sentimentDisplay.innerHTML += `<p style="font-size: 1.5em;">Lingua: ${languageEmoji}</p>`
      confidenceDisplay.innerHTML = `<p style="font-size: 1.5em;">Confidence: <strong>${data.confidence.toFixed(
          2
        )}</strong></p>`

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

      sentimentDisplay.innerHTML += confidenceProgressBar

      const score = data.score
      let scoreColor = ''
      if (score >= 0 && score < 30) {
        scoreColor = 'red' // Low score
      } else if (score >= 30 && score < 70) {
        scoreColor = 'yellow'
      } else {
        scoreColor = 'green'
      }

      scoreDisplay.innerHTML = `<p style="font-size: 1.5em; color: ${scoreColor};">Score: <strong>${score}</strong></p>`
    })
    .catch((error) => {
      console.log(error)
      resultElement.innerHTML =
          '<p>Si è verificato un errore durante la richiesta dei dati.</p>'
    })
}

const sentimentForm = document.getElementById('sentiment-form')
sentimentForm.addEventListener('submit', function (event) {
  event.preventDefault()
  fetchSentimentData()
})

function getLanguageEmoji (language) {
  const languageMap = {
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

  return languageMap[language] || '🏴'
}
