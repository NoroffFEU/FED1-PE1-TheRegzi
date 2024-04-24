function collectFormData() {
    return {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
}

export async function loginUser(formData) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, ${errorResponse.message}`);
        }

        const data = await response.json();
        console.log('Success:', data);

        if (data.accessToken) {
            localStorage.setItem('userToken', data.accessToken)
        }
        
        alert('Login successful!');
        window.location.href = '/index.html'; 
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to login: ' + error.message); 
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = collectFormData();

    await loginUser(formData);
});
