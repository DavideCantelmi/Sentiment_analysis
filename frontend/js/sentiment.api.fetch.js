function fetchSentimentData () {
  const inputElement = document.getElementById('barra-ricerca') // prendo la barra di ricerca dal DOM
  const resultElement = document.getElementById('result') // prendo dal dom il div che contiene l'id "result"
  const searchTerm = inputElement.value // inputElement è l'oggetto relativo a barra di ricerca, di esso mi prendo il value
  const apiUrl = `https://api.example.com/sentiment?searchTerm=${searchTerm}` // chiamo il backend, mettendo come parametro il valore
  fetch(apiUrl) // faccio il fetch dei risultati (prendo i dati dal backend)
    .then(response => response.json()) // inanzitutto prendo la risposta e la converto in json
    .then(data => { // ricorda che i "then" sono ASINCRONI, hanno una funzione simile a await.
      // Manipola i dati ricevuti e mostrali nella pagina
      resultElement.innerHTML = `<p>Il sentiment di "${searchTerm}" è ${data.sentiment}</p>` // il result element era l'oggetto relativo a result
      // prendo il suo html e ci metto questo specificato dalla stringa.
    })
    .catch(error => { // in caso di errore.
      console.log(error) // stampo l'errore
      resultElement.innerHTML = '<p>Si è verificato un errore durante la richiesta dei dati.</p>' // aggiungo invece questa stringa all'html
    })
}
const sentimentForm = document.getElementById('sentiment-form') // prendo il form dal DOM
sentimentForm.addEventListener('submit', function (event) { // aggiungo un event listener. Cos'è l'event Listener?
  // è un oggetto che ascolta gli eventi, in questo caso ascolta l'evento "submit" che è quelo che si verifica quando viene premuto il tasto
  event.preventDefault() // previene l'evento di default.
  fetchSentimentData() // chiamo la funzione fetchSentimentData
})

export default fetchSentimentData
