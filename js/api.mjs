export async function fetchAPI() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/regine");
        if (!response.ok) {
            throw new Error('Network response is not OK');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}