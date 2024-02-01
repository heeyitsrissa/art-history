document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const modal = document.getElementById('artModal');
    const closeModalButton = document.querySelector('.close-button');
    let heroVideo;
    const videoApiKey = 'AIzaSyCrEUWQWNOqW4OCuFyfL3kxNRNXPsBbfAc';

//load youtube IFrame api
    const scriptTag = document.createElement('script');
    scriptTag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

    function youtubePlayerApiReady() {
        heroVideo = new YT.Player('hero-video',{
            height: '360',
            width: '640',
            videoId: 'QiqPvJVgyqE',
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'showinfo': 0,
                'rel': 0,
                'fs': 0,
                'modestbranding': 1
                },
        })
    }

    // Function to open the modal
    function openModal(title, artist, description) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalArtist').textContent = artist;
        document.getElementById('modalDescription').textContent = description;
        modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listener for the close button of the modal
    closeModalButton.addEventListener('click', closeModal);

    // Event listener to close the modal if clicked outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Function to perform a search and display results
    async function searchArt(query) {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id&limit=10`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            searchResults.innerHTML = data.data.map(artwork => {
                const imageUrl = artwork.image_id
                    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
                    : 'path/to/your/placeholder/image.png';
                return `
                    <div class="artwork" data-id="${artwork.id}" data-title="${artwork.title}" data-artist="${artwork.artist_title || 'Unknown Artist'}">
                        <img src="${imageUrl}" alt="${artwork.title}" style="width:100px; cursor:pointer;">
                        <h2>${artwork.title}</h2>
                        <p>${artwork.artist_title}</p>
                    </div>
                `;
            }).join('');

            // Attach click event listeners to each artwork for opening the modal
            searchResults.querySelectorAll('.artwork').forEach(artworkElement => {
                artworkElement.addEventListener('click', () => {
                    const title = artworkElement.dataset.title;
                    const artist = artworkElement.dataset.artist;
                    // Placeholder for description, you will replace this with the actual description later
                    const description = 'Description not available';
                    openModal(title, artist, description);
                });
            });
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
            searchResults.innerHTML = `<p>Error fetching art data. Please try again.</p>`;
        }
    }

    // Event listener for the search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        searchArt(query);
    });
    window.onYouTubeIframeAPIReady = youtubePlayerApiReady;
});
