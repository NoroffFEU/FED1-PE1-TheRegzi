export function logoutUser() {
    const logoutLink = document.querySelector('.logoutLink');

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        window.location.href = '/account/login.html'; 
    })
}
