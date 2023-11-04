function fetchSentimentData () {
  const inputElement = document.getElementById('barra-ricerca')
  const resultElement = document.getElementById('result')
  const searchTerm = inputElement.value
  const apiUrl = `https://api.example.com/sentiment?searchTerm=${searchTerm}`
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Manipola i dati ricevuti e mostrali nella pagina
      resultElement.innerHTML = `<p>Il sentiment di "${searchTerm}" è ${data.sentiment}</p>`
    })
    .catch(error => {
      console.log(error)
      resultElement.innerHTML = '<p>Si è verificato un errore durante la richiesta dei dati.</p>'
    })
}
const sentimentForm = document.getElementById('sentiment-form')
sentimentForm.addEventListener('submit', function (event) {
  event.preventDefault()
  fetchSentimentData()
})

export default fetchSentimentData
