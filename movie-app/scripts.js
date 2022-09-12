const API_KEY = '6fc242606e9c351b651802da5b829e38';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const mainDiv = document.querySelector('main');
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    searchMovies(searchInput.value.replace(' ', '+'));
});

fetch(POPULAR_MOVIES_URL)
    .then(res => res.json())
    .then(res => {
        const movies = res['results'];
        movies.forEach(movie => displayMovie(movie));
    });

function displayMovie(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'movie');
    movieDiv.innerHTML = `
        <img
            src="${IMAGE_BASE_URL}${movie.poster_path}"
            alt="${movie.title}"
            class="movie-poster"
        />  
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-rating ${getClassByRating(movie.vote_average)}">${movie.vote_average}</div>
        </div>          
        <div class="movie-overview">
            <h3>Overview:</h3>
            ${movie.overview}
        </div>
    `;

    mainDiv.appendChild(movieDiv);
}

function getClassByRating(rating) {
    if (rating >= 8) {
        return 'green';
    }
    if (rating >= 5) {
        return 'orange';
    }

    return 'red';
}

function searchMovies(query) {
    fetch(`${SEARCH_BASE_URL}${query}`)
        .then(res => res.json())
        .then(res => {
            const movies = res['results'];
            if (!movies || !movies.length) return;
            mainDiv.innerHTML = '';
            movies.forEach(movie => displayMovie(movie));
        });

    searchInput.value = '';
}