//create variables for elements
var searchEl = document.querySelector("#search-form");
var titleEl = document.querySelector("form");
var posterEl = document.querySelector("#movie-poster");
var posterName = document.querySelector("#posterName");
var albumCover = document.querySelector("#album-cover");
var mainEl = document.querySelector("main");
var albumTitle = document.querySelector("h5");
var urlLink = document.querySelector("#url-link");
var cards = document.querySelector("#card-info");
var pastSearch = document.querySelector("#past-search");

function searchHandler(event) {
  event.preventDefault();
  var title = searchEl.value.trim();

  var pastMovieNames = JSON.parse(localStorage.getItem("movie-names")) || [];
  pastMovieNames.push(title);
  localStorage.setItem("movie-names", JSON.stringify(pastMovieNames));

  movieTitle(title);
  movieAlbum(title);
  renderPastSearch();
}

function renderPastSearch() {
  pastSearch.innerHTML = "";
  var pastMovieNames = JSON.parse(localStorage.getItem("movie-names")) || [];
  for (var i = 0; i < pastMovieNames.length; i++) {
    var li = document.createElement("li");
    li.textContent = pastMovieNames[i];
    pastSearch.append(li);
  }
}

function movieTitle(title) {
  var posterApi =
    "https://www.myapifilms.com/imdb/idIMDB?title=" +
    title +
    "&token=1eb8002a-8b27-40de-8d5b-1327dd9830dd&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=1&companyCredits=0&filmingLocations=0";

  fetch(posterApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (titles) {
      posterEl.src = titles.data.movies[0].urlPoster;
      posterName.textContent = titles.data.movies[0].title;
    });

  searchEl.value = "";
}

function movieAlbum(title) {
  var playlistapi =
    "https://spotify23.p.rapidapi.com/search/?q=" +
    title +
    "&type=playlists&offset=0&limit=6&numberOfTopResults=6";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4b54c538bcmsh85a4b6242a567acp123fb7jsn84b57c55ec54",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(playlistapi, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (titles) {
      cards.innerHTML = "";
      console.log(titles);
      for (var i = 0; i < titles.playlists.items.length; i++) {
        var albumCover = document.createElement("img");
        var albumTitle = document.createElement("h5");
        var textBody = document.createElement("div");
        var urlLink = document.createElement("a");

        albumCover.classList.add("rounded-t-lg");
        albumTitle.classList.add(
          "text-gray-900",
          "text-xl",
          "font-medium",
          "mb-2"
        );
        textBody.classList.add("p-6");
        urlLink.classList.add(
          "inline-block",
          "px-6",
          "py-2.5",
          "bg-blue-600",
          "text-white",
          "font-medium",
          "text-xs",
          "leading-tight",
          "uppercase",
          "rounded",
          "shadow-md",
          "hover:bg-blue-700",
          "hover:shadow-lg",
          "focus:bg-blue-700",
          "focus:shadow-lg",
          "focus:outline-none",
          "focus:ring-0",
          "active:bg-blue-800",
          "active:shadow-lg",
          "transition",
          "duration-150",
          "ease-in-out"
        );

        urlLink.target = "_blank";
        urlLink.textContent = "Playlist";
        albumCover.src =
          titles.playlists.items[i].data.images.items[0].sources[0].url;
        albumTitle.textContent = titles.playlists.items[i].data.name;
        var userPlaylist = titles.playlists.items[i].data.uri.split(":")[2];
        urlLink.href = "https://open.spotify.com/playlist/" + userPlaylist;

        var cardEl = document.createElement("div");
        cardEl.classList.add("rounded-lg", "shadow-lg", "bg-white", "max-w-sm");

        cards.append(cardEl);
        cardEl.append(albumCover);
        cardEl.append(textBody);
        textBody.append(albumTitle);
        textBody.append(urlLink);
      }
    });
}

titleEl.addEventListener("submit", searchHandler);
renderPastSearch();
