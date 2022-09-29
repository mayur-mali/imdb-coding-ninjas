const searchbox = document.getElementById("searchBox");
const movieContainer = document.querySelector(".movie-container");
let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
const favoriteMovieContainer = document.getElementById("favourite-movie");
const sideBar = document.getElementById("side-bar");

// fetch the list of movies from api which is match with the value of searchbox
function fetchMovie() {
  if (searchbox.value.length > 0) {
    movieContainer.style = "display: block";
    fetch(`http://www.omdbapi.com/?s=${searchbox.value}&apikey=79cadf06`)
      .then((response) => response.json())
      .then((data) => {
        if ((data.Response = "True")) {
          showMovies(data.Search);
        }
      });
  } else {
    movieContainer.style = "display: hidden";
  }
}

// show the movies which fetch by the api and show on the page
function showMovies(movieData) {
  const singleMovie = document.getElementById("movie");

  let div = "";
  if (movieData) {
    //  {if you want to use on localhost just remove /imdb-coding-ninjas/ from a tag}
    movieData.forEach((movie) => {
      div += `
      <div class="bg-[#191a23] overflow-hidden rounded-xl relative p-4">

                        <a href="/imdb-coding-ninjas/movie-details.html?id=${movie.imdbID}">
                            <div class="h-48 relative">
                                <img src="${movie.Poster}"
                                    alt="${movie.Poster}" class="w-full h-full absolute rounded-xl object-cover">
                                <div class="absolute bg-black top-0 h-full w-full rounded-xl bg-opacity-50">
                                    <div class="flex h-full items-end p-4 justify-between">
                                        <h3 class="text-2xl font-bold text-white text-center truncate capitalize">
                                        ${movie.Title}</h3>

                                    </div>
                                </div>
                            </div>

                        </a>
                        <span class="absolute top-10 right-10 cursor-pointer"  onclick="addTofavourite(this)" id=${movie.imdbID}>
                            <svg xmlns="http://www.w3.org/2000/svg"    viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>

                        </span>
                    </div>
    `;
    });
  }
  singleMovie.innerHTML =
    div ||
    `<h1 class="text-white text-4xl text-center capitalize">no movie find....</h1>`;
}

// debounce function for make better performance of search api
function debounceFunction(data, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      data();
    }, delay);
  };
}

const debounce = debounceFunction(fetchMovie, 1000);

// open the favorite movie section
function favouriteMenuOpen() {
  sideBar.classList.remove("sidebar-hidden");
  // call the favoritemovie list function
  favouriteMovieList();
}
// close the favorite movie section
function favouriteMenuClose() {
  sideBar.classList.add("sidebar-hidden");
}

// add movie to favorite movie list and store into localStorage for keep this after refresh also
function addTofavourite(movieId) {
  fetch(`http://www.omdbapi.com/?i=${movieId.id}&apikey=79cadf06`)
    .then((response) => response.json())
    .then((data) => {
      if ((data.Response = "True")) {
        favoriteList.push(data);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        favouriteMovieList();
        alert("Added to favorites list");
      }
    });
}

// completely remove movie from the favorite movie list
function deleteFavouriteMovie(id) {
  deleteMovie = favoriteList.splice(id, 1);
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  favouriteMovieList();
}

// fetching favorites movie from localStorage and showing onto favorite list
function favouriteMovieList() {
  let div = "";
  favoriteList.forEach((movie, id) => {
    div += `
   
    <div class="bg-[#23232e] relative flex gap-x-3 h-28 p-3 rounded-xl">
    <a href="/movie-details.html?id=${movie.imdbID}">
    <img src="${movie.Poster}"
        alt="${movie.Title}" class="h-full w-32 flex-none rounded-xl object-cover">
        </a>
    <div class="w-32 flex flex-col justify-between">
        <h2 class="text-white text-lg font-bold capitalize truncate">${movie.Title}</h2>
        <div class=" text-md flex w-16 justify-between items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>

            <span class="text-white font-bold">
            ${movie.imdbRating}
            </span>
        </div>
    </div>
   
    <span class="cursor-pointer" onclick="deleteFavouriteMovie(${id})">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            class="w-10 h-10 absolute right-3 bottom-3 rounded-full text-black p-2 bg-white">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>

    </span>
</div>

    `;
  });
  favoriteMovieContainer.innerHTML =
    div ||
    `<h2 class="text-white text-2xl font-bold">No movie's in favourite List</h2>`;
}
