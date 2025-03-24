const searchInput = document.querySelector('.search-input')
const form = document.querySelector('form')
const moviePoster = document.querySelector('.movie-poster')
const movieDetails = document.querySelector('.movie-details')
const infoH2 = document.querySelector('.info')
const movieContainer = document.querySelector('.movie-container')

const fetchingMovieDetails = async (movie) => {
  infoH2.innerHTML = ''

  try {
    movieContainer.style.display = 'flex'
    const myApiKey = '77dae91e'
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${myApiKey}&t=${movie}`

    const response = await fetch(url)
    const data = await response.json()
    showMovieData(data)
  } catch (error) {
    infoH2.innerHTML = `<h2>Error in fetching Movie Details</h2>`
    movieContainer.style.display = 'none'
  }
  
}

showMovieData = (data) => {
  const { Title, Genre, Actors, Plot, Runtime, Released, imdbRating, Poster } = data

  const movieElement = document.createElement('div')
  movieElement.innerHTML = ` 
             <h1 class="movie-title">${Title}</h1>
             <p class="ratings"><strong>Ratings</strong> ⭐${imdbRating}</p>
           `

  const movieGerneElement = document.createElement('div')
  movieGerneElement.classList.add('buttons-contents')
  Genre.split(',').forEach((ele) => {
    const p = document.createElement('p')
    p.innerHTML = ele
    movieGerneElement.appendChild(p)
  })

  const movieDetailsContent = document.createElement('div')
  movieDetailsContent.classList.add('movie-details-content')
  movieDetailsContent.innerHTML = `<p class="release-date">
                <strong>Released Date:</strong> ${Released}
              </p>
              <p class="duration"><strong>Duration:</strong> ${Runtime}</p>
              <p class="cast">
                <strong>Cast:</strong> ${Actors}
              </p>
              <p class="plot">
                <strong>Plot:</strong> ${Plot}
              </p>
            `

  moviePoster.innerHTML = `<img src="${Poster}" alt="" />`

  movieDetails.appendChild(movieElement)
  movieDetails.appendChild(movieGerneElement)
  movieDetails.appendChild(movieDetailsContent)
}

form.addEventListener('submit', (e) => {
  infoH2.innerHTML = `<h2>Fetching movie Details</h2>`
  e.preventDefault()
  const movieName = searchInput.value.trim()
  if (movieDetails.innerHTML !== '') {
    movieDetails.innerHTML = ''
  }
  if (movieName !== '') {
    fetchingMovieDetails(movieName)
  } else {
    infoH2.innerHTML = `<h2>Please enter Movie Name</h2>`
  }
})
