function collectFormData() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
}

async function registerUser(formData) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Registration successful!');
        window.location.href = '/account/login.html'; 
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to register: ' + error.message); 
    }
}

function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = collectFormData();
    const password = document.getElementById('password').value;
    if (!validatePasswords(formData.password, formData.confirmPassword)) {
        alert('Passwords do not match.');
        return;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }

    await registerUser(formData);
});