
    const name = localStorage.getItem('name');
    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get("id");
    const userToken = localStorage.getItem('userToken');
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`;

async function editPost(formData) {
    
    try {
        const response = await fetch(apiUrl, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                title: formData.get('title'),
                body: formData.get('blog-text'),  
                tags: [], 
                media: {
                    url: formData.get('banner-image-url'),
                    alt: 'Banner Image'
                },
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Blog post is created successfully!');
        window.location.href = '/index.html'; 
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create blog post: ' + error.message); 
    }
}

document.getElementById('blogPostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    editPost(formData);
});

async function fetchPostById(postId) {
    console.log(apiUrl);
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

// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         const queryParams = new URLSearchParams(window.location.search);
//         const postId = queryParams.get("id");
//         const post = await fetchPostById(postId);
//         if (post) {
//             displayBlogPost(post);
//         } else {
//             console.error("Blog post not found");
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//     } 
// });



function populateForm() {

}

fetchPostById(postId);
