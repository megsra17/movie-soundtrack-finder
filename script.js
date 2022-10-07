//create variables for elements

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

//create a function to get playlist from searched movie
    //display playlist picture
    //display playlist title
    //play song on site (hard)

function movieTitle(){

    fetch('https://mdblist.p.rapidapi.com/?s=jaws', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

function movieAlbum(){

    fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=playlists&offset=0&limit=10&numberOfTopResults=5', option)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}