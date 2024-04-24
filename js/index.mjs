
document.getElementById('hamburger-button').addEventListener('click', function() {
    var content = document.getElementById('hamburger-content');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.classList.add('visible');
    } else {
        content.classList.remove('visible');
        content.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const createPostLink = document.getElementById('createPostLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const userToken = localStorage.getItem('data.accessToken');
    console.log('Usertoken:', userToken);

    if (userToken) {
        createPostLink.style.display = 'block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        createPostLink.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
});

