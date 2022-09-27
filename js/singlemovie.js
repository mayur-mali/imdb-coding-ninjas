const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const movieContainer = document.getElementById("single-movie-details");
const loadingScreen = document.getElementById("loadin-screen").style;

function fetchMovie() {
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=79cadf06`)
    .then((response) => response.json())
    .then((data) => {
      if ((data.Response = "True")) {
        showMovie(data);
      }
    });
}

function showMovie(movie) {
  let movieDiv = "";
  movieDiv += `  <div class="grid grid-cols-6 gap-6">
  <div class="md:col-span-2 col-span-6 ">
      <img src="${movie.Poster}"
          alt="${movie.Title}" class="object-cover  rounded-md md:h-auto h-72 w-full">
  </div>
  <div class="md:col-span-4 space-y-8 flex flex-col justify-center col-span-6 py-2">
      <div>
          <h1 class="text-white font-bold md:text-3xl text-xl">${movie.Title}</h1>

      </div>
      <p class="md:text-xl text-lg text-gray-400">
      ${movie.Plot}
      </p>
      <div>
          <h1 class="text-white font-bold md:text-3xl text-xl">Actors</h1>
          <ul class="flex space-x-5 text-gray-400 pt-3">
              <li>${movie.Actors}</li>
          </ul>
      </div>
      <div class="flex flex-col md:flex-row justify-between md:space-y-0 space-y-4">
          <div class=" text-md flex w-16 justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-orange-500">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>

              <span class="text-white font-bold">
              ${movie.imdbRating}
              </span>
          </div>
          <span class="text-white font-bold">
              Released : <span class="text-gray-400">${movie.Released}</span>
          </span>
          <span class="text-white font-bold">
              Genre : <span class="text-gray-400">${movie.Genre}</span>
          </span>
      </div>


  </div>
  <div class="col-span-6 bg-zinc-900 rounded-xl w-full p-4">
      <div class="flex flex-wrap gap-5">
          <span class="text-white font-bold">
              Director : <span class="text-gray-400">${movie.Director}</span>
          </span>
          <span class="text-white font-bold">
              Writer : <span class="text-gray-400">${movie.Writer}</span>
          </span>
          <span class="text-white font-bold">
              Language : <span class="text-gray-400">${movie.Language}</span>
          </span>
          <span class="text-white font-bold">
              Country : <span class="text-gray-400">${movie.Country}</span>
          </span>
          <span class="text-white font-bold">
              Type : <span class="text-gray-400">${movie.Type}</span>
          </span>
          <span class="text-white font-bold">
              BoxOffice : <span class="text-gray-400">${movie.BoxOffice}</span>
          </span>
      </div>
  </div>
</div>`;

  movieContainer.innerHTML = movieDiv;
}

fetchMovie();
setTimeout(() => {
  console.log("loading");
  loadingScreen.display = "none";
}, 2000);
