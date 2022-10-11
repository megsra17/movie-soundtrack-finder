//create variables for elements
var searchEl = document.querySelector('#search-form')
var titleEl = document.querySelector('#title-input')

//spotify api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e6120f0cfdmsh626c61ade9001c5p1868bfjsn9aab679eeb68',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

//movie api
const option = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e6120f0cfdmsh626c61ade9001c5p1868bfjsn9aab679eeb68',
		'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
	}
};
//create a function to get elements from search movie
    //add event listener to search
    //display movie title along with image
function searchHandler(event){
	event.preventDeafult();
	var title = titleEl.value.trim();

	movieTitle(title);
	movieAlbum(title);

}

//create a function to get playlist from searched movie
    //display playlist picture
    //display playlist title
    //play song on site (hard)

function movieTitle(title){

    fetch('https://mdblist.p.rapidapi.com/?s=jaws', options);
	.then(function(response){
		return response.json();
	})
	.then(function(titles){
		
	})
	.catch(err => console.error(err));

	titleEl.value = ''

}

function movieAlbum(title){

    fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=playlists&offset=0&limit=10&numberOfTopResults=5', option)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

searchEl.addEventListener('button', searchHandler)
