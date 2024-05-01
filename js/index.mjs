
import { logoutUser } from "./logout.mjs";


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
    const createPostLink = document.querySelector('.createPostLink');
    const loginLink = document.querySelector('.loginLink');
    const registerLink = document.querySelector('.registerLink');
    const logoutLink = document.querySelector('.logoutLink');
    const userToken = localStorage.getItem('userToken');
    const loginLinkFooter = document.querySelector('.loginLink-footer');
    const registerLinkFooter = document.querySelector('.registerLink-footer');

    if (userToken) {
        createPostLink.style.display = 'block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
        loginLinkFooter.style.display = 'none';
        registerLinkFooter.style.display = 'none';

    } else {
        createPostLink.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
        loginLinkFooter.style.display = 'block';
        registerLinkFooter.style.display = 'block';
    }
});


logoutUser();

