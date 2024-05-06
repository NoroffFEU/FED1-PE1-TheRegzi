

export async function fetchPosts() {
    const defaultName = 'public';
    const name = localStorage.getItem('name') || defaultName;
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;
    const userToken = localStorage.getItem('userToken'); 

    try {
        const headers = userToken ? {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        };

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        return posts.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await fetchPosts();
        if (posts && posts.length > 0) {
            displayPosts(posts);
        } else {
            console.log('No posts available to display.');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
});

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class='first-section'>
                <div class='post-heading'>
                    <a href='/post/index.html?id=${post.id}'>${post.title}</a>
                </div>
                <div class='post-img'>
                    <img class='img' src="${post.media.url}" alt="Banner image for ${post.title}">
                </div>
            </div>
            <div class='second-section'>
                <a class='read-more' href='/post/index.html?id=${post.id}'>Read more <i class="fa-solid fa-right-long"></i><a>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

