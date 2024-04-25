async function createPost(formData) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/regine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get('title'),
                body: formData.get('blog-text'), 
                author: formData.get('author'), 
                tags: [], 
                media: {
                    url: formData.get('banner-image-url'),
                    alt: 'Banner Image'
                },
                created: formData.get('publication-date')
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
    createPost(formData);
});