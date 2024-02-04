document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let heroVideo;


    function openModal(title, artist, artist_display) {
        // Set the content in the modal's title and body
        document.getElementById('exampleModalLongTitle').textContent = title;
        const modalBody = document.querySelector('#exampleModalCenter .modal-body');
        modalBody.innerHTML = `
            <p><h3>${artist}</h3></p>
            <p>${artist_display}</p>
        `;
    
        // Use Bootstrap's modal method to show the modal
        var myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
        myModal.show();


    // Function to open the modal
     async function openModal(title, artist, artist_display) {
      
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalArtist').textContent = artist;
        document.getElementById('modalDescription').textContent = artist_display;
        modal.style.display = 'block';
    }


    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';

    }

    // Event listener for the search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        searchArt(query);
    });

    // Function to perform a search and display results
    async function searchArt(query) {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id,thumbnail&limit=10`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            searchResults.innerHTML = data.data.map(artwork => {
                const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : 'path/to/your/placeholder/image.png';
                return `
                <div class="d-flex my-3 flex-column col-12 col-lg-4">
                    <div class="artwork d-flex flex-wrap flex-column" data-id="${artwork.id}" data-title="${artwork.title}" data-artist="${artwork.artist_title || 'Unknown Artist'}" data-artist_display="${artwork.thumbnail.alt_text || 'Unknown Artist Display'}">
                        <img class="d-flex justify-content-center" src="${imageUrl}" alt="${artwork.title}" style="width:300px; cursor:pointer;">
                        <h2>${artwork.title}</h2>
                        <p>${artwork.artist_title}</p>
                    </div>
                </div>
                `;
            }).join('');

            searchResults.querySelectorAll('.artwork').forEach(artworkElement => {
                artworkElement.addEventListener('click', () => {
                    const title = artworkElement.dataset.title;
                    const artist = artworkElement.dataset.artist;
                    const artist_display = artworkElement.dataset.artist_display;
                    openModal(title, artist, artist_display);
                });
            });
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
            searchResults.innerHTML = `<p>Error fetching art data. Please try again.</p>`;
        }
    }

    // YouTube Video Setup
function onYouTubeIframeAPIReady() {
    heroVideo = new YT.Player('hero-video', {
        height: '650',  // Height set to 650px
        width: '100%',  // Width set to 100%
        videoId: 'zrzEzGxWJNw', // Replace with your video ID
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'mute': 1,
            'loop': 1,
            'playlist': 'zrzEzGxWJNw', // Replace with your video ID for looping
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'fs': 0
        },
        events: {
            'onReady': function(event) {
                event.target.mute(); // Mute the video by default
            }
        }
    });
}

// Load the YouTube IFrame Player API code asynchronously
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Set the onYouTubeIframeAPIReady function globally so the API can call it
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
});
