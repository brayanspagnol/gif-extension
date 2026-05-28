const API_KEY = "LIVDSRZULELA";
const LIMIT = 20;

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.querySelector('.loading');
    const loadMoreDiv = document.querySelector('.load-more');
    const sentinel = document.getElementById('loadMoreSentinel');

    let currentQuery = '';
    let nextPos = '';
    let isLoading = false;
    let hasMore = true;

    function clearResults() {
        resultsDiv.querySelectorAll('.gif-item, .empty-state').forEach((el) => el.remove());
        loadMoreDiv.classList.remove('end', 'error');
        loadMoreDiv.style.display = 'none';
        loadMoreDiv.textContent = 'Carregando mais...';
        sentinel.style.display = 'block';
    }

    function createGifItem(gif) {
        const gifUrl = gif.media[0].gif.url;
        const gifDiv = document.createElement('div');
        gifDiv.className = 'gif-item';

        const img = document.createElement('img');
        img.src = gifUrl;
        img.alt = gif.title || 'GIF';
        img.loading = 'lazy';

        img.draggable = true;
        img.addEventListener('dragstart', (e) => {
            const tempImg = new Image();
            tempImg.src = gifUrl;
            e.dataTransfer.setData('text/plain', gifUrl);
            e.dataTransfer.setData('text/uri-list', gifUrl);
            e.dataTransfer.setDragImage(tempImg, 0, 0);
            e.dataTransfer.effectAllowed = 'copy';
        });

        gifDiv.appendChild(img);
        return gifDiv;
    }

    function showEmptyState(message) {
        clearResults();
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = message;
        resultsDiv.insertBefore(empty, loadMoreDiv);
        sentinel.style.display = 'none';
    }

    function appendGifs(gifs) {
        gifs.forEach((gif) => {
            resultsDiv.insertBefore(createGifItem(gif), loadMoreDiv);
        });
    }

    async function fetchGifs({ reset = false } = {}) {
        if (isLoading) return;
        if (!reset && !hasMore) return;

        const searchTerm = reset ? searchInput.value.trim() : currentQuery;
        if (!searchTerm) return;

        if (reset) {
            currentQuery = searchTerm;
            nextPos = '';
            hasMore = true;
            clearResults();
        }

        isLoading = true;
        if (reset) {
            loadingDiv.style.display = 'flex';
        } else {
            loadMoreDiv.style.display = 'flex';
        }

        try {
            const params = new URLSearchParams({
                q: searchTerm,
                key: API_KEY,
                limit: String(LIMIT),
            });
            if (nextPos) params.set('pos', nextPos);

            const response = await fetch(`https://g.tenor.com/v1/search?${params}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const gifs = data.results || [];

            if (reset && gifs.length === 0) {
                showEmptyState('Nenhum GIF encontrado. Tente outro termo.');
                hasMore = false;
                return;
            }

            if (gifs.length > 0) appendGifs(gifs);

            nextPos = data.next || '';
            hasMore = Boolean(nextPos);

            if (!hasMore) {
                loadMoreDiv.textContent = 'Fim dos resultados';
                loadMoreDiv.classList.add('end');
                loadMoreDiv.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error searching GIFs:', error);
            if (reset) {
                showEmptyState('Erro ao buscar GIFs. Tente novamente.');
            } else {
                loadMoreDiv.textContent = 'Erro ao carregar. Role de novo.';
                loadMoreDiv.classList.add('error');
                loadMoreDiv.style.display = 'flex';
            }
        } finally {
            isLoading = false;
            loadingDiv.style.display = 'none';
            if (hasMore && !loadMoreDiv.classList.contains('error')) {
                loadMoreDiv.style.display = 'none';
            }
        }
    }

    function searchGifs() {
        fetchGifs({ reset: true });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && hasMore && !isLoading && currentQuery) {
                fetchGifs({ reset: false });
            }
        },
        { root: resultsDiv, rootMargin: '80px', threshold: 0 }
    );
    observer.observe(sentinel);

    searchButton.addEventListener('click', searchGifs);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') searchGifs();
    });

    searchInput.focus();
});
