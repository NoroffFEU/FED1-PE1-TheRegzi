
    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get("id");

async function fetchPostById(postId) {
    
    const defaultName = 'Regine';
    const name = localStorage.getItem('name') || defaultName;
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`;
    const userToken = localStorage.getItem('userToken');

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Failed to fetch the post:', error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const post = await fetchPostById(postId);
        if (post) {
            displayBlogPost(post);
        } else {
            console.error("Blog post not found");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } 
});

function displayBlogPost(post) {

    const postImage = document.getElementById("post-image");
    postImage.innerHTML = `<img src="${post.data.media.url}" alt="${post.data.title}" class="blog-post-img">`;

    const postTitle = document.getElementById("post-heading");
    postTitle.textContent = post.data.title;

    const author = document.getElementById("author");
    author.textContent = `Written by `+ post.data.author.name;

    const published = document.getElementById("published");
    published.textContent = formatPublishedDate(post.data.created);
    
    const postBody = document.getElementById("post-body");
    postBody.textContent = post.data.body;

    const editPostButton = document.getElementById("edit-post");
    editPostButton.addEventListener("click", () => {
        window.location.href = `/post/edit.html?id=${postId}`; 

    });
}

function formatPublishedDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit' 
    });
    return `Published on ${formattedDate} at ${formattedTime}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const userToken = localStorage.getItem('userToken');
    const editPost = document.querySelector('#edit-post');

    if (userToken) {
        editPost.style.display = 'block';
    } else {
        editPost.style.display = 'none';
    }
});