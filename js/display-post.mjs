
import { fetchPosts } from './fetch-post.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await fetchPosts();
        if (posts && posts.length > 0) {
            displayPosts(posts);
        } else {
            console.log('Error fetching posts');
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
            <h2>${post.title}</h2>
            <img src="${imageUrl}" alt="Banner image for ${post.title}">
        `;
        postsContainer.appendChild(postElement);
    });
}

