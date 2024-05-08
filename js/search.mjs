
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchInfo = document.getElementById('search-info');
    
    fetchPosts().then(() => {
        updatePostVisibility(); 
    });

    searchInput.addEventListener('input', updatePostVisibility);

    async function fetchPosts() {
        const defaultName = 'Regine';
        const name = localStorage.getItem('name') || defaultName;
        const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const posts = await response.json();
            renderPosts(posts.data);
            return posts.data;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    function renderPosts(posts) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            const tagsString = post.tags && post.tags.length > 0 ? post.tags.join(' ').toLowerCase() : '';
            postElement.setAttribute('data-tags', tagsString);
            postElement.innerHTML = `
                <a class='search-title' href='/post/index.html?id=${post.id}'>${post.title}</a>
                <img class='img' src="${post.media.url}" alt="Banner image for ${post.title}">
            `;
            resultsContainer.appendChild(postElement);
        });
    }

    function updatePostVisibility() {
        const originalSearchValue = searchInput.value;
        const searchValue = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('.post');
        let visibleCount = 0; 

        posts.forEach(post => {
            const tags = post.getAttribute('data-tags').split(' ');
            if (searchValue && tags.includes(searchValue)) {
                post.style.display = '';
                visibleCount++; 
            } else {
                post.style.display = 'none';
            }
        });

        if (searchValue) {
            searchInfo.textContent = `${originalSearchValue} (${visibleCount})`;
        } else {
            searchInfo.textContent = '';
        }
    }
});