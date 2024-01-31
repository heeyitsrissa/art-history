document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const modal = document.getElementById('artModal');
    const closeModal = document.querySelector('.close-button');

    // Function to show the modal with art details
    function showModal(title, artist, description) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalArtist').textContent = artist;
        document.getElementById('modalDescription').textContent = description;
        modal.style.display = 'block';
    }

    // Function to attach click events to images
    function attachClickEventsToImages() {
        const images = searchResults.querySelectorAll('img');
        images.forEach(image => {
            image.addEventListener('click', () => {
                const item = image.closest('.search-result-item');
                const title = item.dataset.title;
                const artist = item.dataset.artist;
                const description = item.dataset.description; // Assuming description data is available
                showModal(title, artist, description);
            });
        });
    }

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Also close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to fetch and display art results
    async function searchArt(query) {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id&limit=10`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            searchResults.innerHTML = data.data.map(item => {
                const imageUrl = item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg` : 'path/to/placeholder/image';
                return `<div class="search-result-item" data-title="${item.title}" data-artist="${item.artist_title}" data-description="Description not available.">
                            <img src="${imageUrl}" alt="${item.title}" style="width:100px; cursor:pointer;">
                            <h2>${item.title}</h2>
                            <p>${item.artist_title}</p>
                        </div>`;
            }).join('');

            // Attach click events to images after they have been added to the DOM
            attachClickEventsToImages();
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
            searchResults.innerHTML = `<p>Error fetching art data. Please try again.</p>`;
        }
    }

    // Event listener for the search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchArt(query);
        }
    });
});
