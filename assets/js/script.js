const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Add event listener to the form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting traditionally
    const query = searchInput.value.trim(); // Get the user's query from the input field
    if (query) {
        searchArt(query); // Call the searchArt function with the user's query
    }
});

async function searchArt(query) {
    searchResults.innerHTML = 'Loading...'; // Show a loading message
    // Construct the API URL with the search query
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id&limit=10`;

    try {
        const response = await fetch(url); // Fetch data from the API
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json(); // Parse the JSON response

        if (data.data && data.data.length > 0) {
            displayResults(data.data); // Display the results if any are found
        } else {
            searchResults.innerHTML = '<p>No results found. Try another search!</p>'; // Show a message if no results are found
        }
    } catch (error) {
        console.error('Search failed:', error);
        searchResults.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`; // Show an error message if the fetch fails
    }