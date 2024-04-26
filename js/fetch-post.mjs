
export async function fetchPosts() {
    const name = localStorage.getItem('name');
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${name}`;
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log('Retrieved posts:', posts);
        return posts;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}


