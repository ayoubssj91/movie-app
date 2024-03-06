const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');
const favoritesList = document.getElementById('favoritesList');
let favorites = [];
 
async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b8b0822b2c0b4c21fc4b8e2623bafb75&query=${query}`);
    const data = await response.json();
    return data.results;
}
 
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
 
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.alt = movie.title;
        movieElement.appendChild(image);
 
        const title = document.createElement('div');
        title.classList.add('movie-title');
        title.textContent = movie.title;
        movieElement.appendChild(title);
 
        const description = document.createElement('div');
        description.classList.add('movie-description');
        description.textContent = movie.overview;
        movieElement.appendChild(description);
 
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => addToFavorites(movie));
        movieElement.appendChild(favoriteButton);
 
        movieList.appendChild(movieElement);
    });
}
 
function addToFavorites(movie) {
    if (!favorites.find(fav => fav.id === movie.id)) {
        favorites.push(movie);
        displayFavorites();
        saveFavorites();
    }
}
 
function displayFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(favorite => {
        const favoriteItem = document.createElement('li');
        favoriteItem.textContent = favorite.title;
        favoritesList.appendChild(favoriteItem);
    });
}
 
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
 
function loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
        displayFavorites();
    }
}
 
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        const movies = await searchMovies(query);
        displayMovies(movies);
    }
});
 
window.addEventListener('load', loadFavorites);
 
