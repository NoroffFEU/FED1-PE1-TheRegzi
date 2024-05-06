export function logoutUser() {
    const logoutLink = document.querySelector('.logoutLink');

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('name');
        window.location.href = '/account/login.html'; 
    })
}
