import { invisibleLoader, visibleLoader } from "./loader.mjs";

export async function fetchPosts() {
    const defaultName = 'Regine';
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


function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

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

const tagMap = {
    all: [],
    ai: ['ai', 'artificial'], 
    connectivity: ['connectivity', 'network', 'connected'],
    tech: ['tech', 'technology', 'innovation']
};

function filterPosts(posts, filter) {
    let filteredPosts = posts.filter(post => {
        if (filter === 'all') {
            return true;
    }
    const relevantTags = tagMap[filter];
    return post.tags.some(tag => relevantTags.includes(tag.toLowerCase()));
    });
    displayPosts(filteredPosts);
}

document.addEventListener('DOMContentLoaded', async () => {
    visibleLoader();
    try {
        const posts = await fetchPosts();
        if (posts && posts.length > 0) {
            displayPosts(posts);

            const buttons = document.querySelectorAll(".btn");
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    buttons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                    const filter = button.getAttribute("data-filter");
                    filterPosts(posts, filter);
                });
            });
        } else {
            console.log('No posts available to display.');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    } finally {
        invisibleLoader();
    }
});