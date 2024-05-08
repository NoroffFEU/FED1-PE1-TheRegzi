
    const name = localStorage.getItem('name');
    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get("id");
    const userToken = localStorage.getItem('userToken');
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`;

async function editPost(formData) {
    
    try {
        const tagsInput = formData.get('tags');
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
        const response = await fetch(apiUrl, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                title: formData.get('title'),
                body: formData.get('blog-text'),  
                tags: tags, 
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
        alert('Blog post is updated successfully!');
        window.location.href = '/index.html'; 
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update blog post: ' + error.message); 
    }
}

document.getElementById('blogPostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    editPost(formData);
});

async function fetchPostById(postId) {
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
        console.log(post);
        return post;
    } catch (error) {
        console.error('Failed to fetch the post:', error);
        return null;
    }
}

function populateForm(post) {
    if (!post) {
        console.error('No post data to populate the form.');
        return;
    }

    document.getElementById('title').value = post.data.title || '';
    document.getElementById('tags').value = post.data.tags ? post.data.tags.join(', ') : '';
    document.getElementById('blog-text').value = post.data.body || '';
    document.getElementById('banner-image-url').value = post.data.media.url || '';
}


async function deleteBlogPost(name, postId) {
    const userToken = localStorage.getItem('userToken'); 
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });
        
        if (response.status === 204) {
            alert('Blog post deleted successfully.');
            window.location.href = `/index.html`;
            return;
        } else {
            throw new Error('Failed to delete blog post.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting blog post: ' + error.message); 
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get("id");
    const name = localStorage.getItem('name');

    if (postId) {
        try {
            const post = await fetchPostById(postId, name);
            if (post) {
                populateForm(post);
            } else {
                console.error("Blog post not found");
                window.location.href = '/index.html';
                return;
            }
        } catch (error) {
            console.error("An error occurred while fetching the post:", error);
            window.location.href = '/index.html';
            return;
        } 
    }

    document.getElementById('delete').addEventListener('click', function() {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            deleteBlogPost(name, postId);
        }
    });

});
    







