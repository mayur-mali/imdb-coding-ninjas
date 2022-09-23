const searchbox = document.getElementById("searchBox");
const movieContainer = document.querySelector(".movie-container");

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

function showMovies(movieData) {
  const singleMovie = document.getElementById("movie");
  let div = "";
  if (movieData) {
    movieData.forEach((movie) => {
      console.log(movie);
      div += `
    <div class="bg-[#191a23] overflow-hidden rounded-xl  p-4">
    <a href="/single-movie.html?id=${movie.imdbID}">
        <div class="h-48 relative">
            <img src="${movie.Poster}" alt="${movie.Title}"
                class="w-full h-full absolute rounded-xl object-cover">
        </div>
        <div class="flex flex-col gap-y-7 mt-5">
            <h3 class="text-2xl font-bold text-white text-center capitalize">${movie.Title}</h3>

            <button
                class="bg-[#59e6b7] text-white capitalize font-bold rounded-full px-4 py-1 w-full mx-auto">add
                to
                fav</button>
        </div>
    </a>
</div>
    `;
    });
  }
  singleMovie.innerHTML =
    div ||
    `<h1 class="text-white text-4xl text-center capitalize">no movie find....</h1>`;
}

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
