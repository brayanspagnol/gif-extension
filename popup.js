const API_KEY = "LIVDSRZULELA";
const LIMIT = 15;

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.querySelector('.loading');

    // Function to search GIFs
    async function searchGifs() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;

        loadingDiv.style.display = 'block';
        resultsDiv.innerHTML = '';

        try {
            const url = `https://g.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&limit=${LIMIT}`;
            const response = await fetch(url);
            const data = await response.json();

            data.results.forEach(gif => {
                const gifDiv = document.createElement('div');
                gifDiv.className = 'gif-item';
                
                const img = document.createElement('img');
                img.src = gif.media[0].gif.url;
                img.alt = gif.title;
                
                // Configure drag and drop
                img.draggable = true;
                img.addEventListener('dragstart', (e) => {
                    // Create a temporary element to store the GIF URL
                    const tempImg = new Image();
                    tempImg.src = gif.media[0].gif.url;
                    
                    // Add the GIF URL to the transfer data
                    e.dataTransfer.setData('text/plain', gif.media[0].gif.url);
                    e.dataTransfer.setData('text/uri-list', gif.media[0].gif.url);
                    
                    // Set the drag image
                    e.dataTransfer.setDragImage(tempImg, 0, 0);
                    
                    // Add all possible data types
                    e.dataTransfer.effectAllowed = 'copy';
                });

                gifDiv.appendChild(img);
                resultsDiv.appendChild(gifDiv);
            });
        } catch (error) {
            console.error('Error searching GIFs:', error);
            resultsDiv.innerHTML = '<p style="color: red;">Error searching GIFs. Please try again.</p>';
        } finally {
            loadingDiv.style.display = 'none';
        }
    }

    // Event listeners
    searchButton.addEventListener('click', searchGifs);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchGifs();
        }
    });

    // Automatic focus on the search field
    searchInput.focus();
}); 