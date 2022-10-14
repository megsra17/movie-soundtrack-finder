//create variables for elements
var searchEl = document.querySelector('#search-form')
var titleEl = document.querySelector('form')
var posterEl = document.querySelector('#movie-poster')
var posterName = document.querySelector('#posterName')
var mainEl = document.querySelector('main');

//spotify api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e6120f0cfdmsh626c61ade9001c5p1868bfjsn9aab679eeb68',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function searchHandler(event){
	event.preventDefault();
	var title = searchEl.value.trim();
	localStorage.setItem('movie-name', title);

	movieTitle(title);
	movieAlbum(title);

}

function movieTitle(title){
	var posterApi = "https://www.myapifilms.com/imdb/idIMDB?title="+title+"&token=1eb8002a-8b27-40de-8d5b-1327dd9830dd&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=1&companyCredits=0&filmingLocations=0"

    fetch(posterApi)
	.then(function(response){
		return response.json();
	})
	.then(function(titles){
		
		posterEl.src = titles.data.movies[0].urlPoster;

		posterName.textContent = titles.data.movies[0].title;
		console.log(posterName, posterEl)

		posterName.appendChild(mainEl)
	})

	searchEl.value = '';

}

//create a function to get playlist from searched movie
    //display playlist picture
    //display playlist title
    //play song on site (hard)
	
	function movieAlbum(title){
		var playlistapi = "https://spotify23.p.rapidapi.com/search/?q="+title+"&type=playlists&offset=0&limit=6&numberOfTopResults=6"

		console.log(playlistapi);
		
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '4b54c538bcmsh85a4b6242a567acp123fb7jsn84b57c55ec54',
				'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
			}
		};
		
		fetch(playlistapi, options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));



	}

// function movieAlbum(title){
	
//     fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=playlists&offset=0&limit=10&numberOfTopResults=5', option)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// }

titleEl.addEventListener('submit', searchHandler)

//test

