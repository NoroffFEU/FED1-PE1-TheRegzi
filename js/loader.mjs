export function visibleLoader() {
    const loader = document.querySelector(".loader");
    loader.hidden = false;
}

export function invisibleLoader() {
    const loader = document.querySelector(".loader");
    loader.hidden = true;
}