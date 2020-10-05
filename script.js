const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loader = document.getElementById('loader')

// Show Loading

const loading = () => {
  loader.hidden = false
  quoteContainer.hidden = true
}

const loaded = () => {
  if (!loader.hidden) loader.hidden = true
  quoteContainer.hidden = false
}
const getQuote = async () => {
  loading()
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  try {
    const response = await fetch(proxyURL + apiURL)
    const data = await response.json()
    if (data.quoteAuthor === '') {
      authorText.innerText = 'unknown'
    }
    if (data.quoteText.lenght > 50) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    authorText.innerText = data.quoteAuthor
    quoteText.innerText = data.quoteText
    loaded()
  } catch (err) {
    loading()
  }
}

const tweetQuote = () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterURL, '_blank')
}

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Page Load
getQuote()
