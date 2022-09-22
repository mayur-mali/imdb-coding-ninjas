const searchbox = document.getElementById("searchBox");

function getMovieData() {
  fetch(`http://www.omdbapi.com/?s=${searchbox.value}&apikey=79cadf06`)
    .then((response) => response.json())
    .then((data) => {
      if ((data.Response = "True")) {
        console.log(data.Search);
      }
    });
  //   console.log(searchbox.value);
}

function fetchMovie(data, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      data();
    }, delay);
  };
}

const debounceFunction = fetchMovie(getMovieData, 1000);
