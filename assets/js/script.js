const artApiUrl = 'https://api.artic.edu/api/v1/artworks/search';
const videoApiUrl = 'https://www.googleapis.com/youtube/v3/videos?'
const videoApiKey = 'AIzaSyCrEUWQWNOqW4OCuFyfL3kxNRNXPsBbfAc'

const searchForm = document.getElementById('search-form');

const submitBtn = document.getElementById('submitBtn');

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    searchArt();
})

async function searchArt(art){
const ArtResponse = await fetch(`${artApiUrl}?`)
}