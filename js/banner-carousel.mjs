import { invisibleLoader, visibleLoader } from "./loader.mjs";

var slideIndex = 1;
const defaultName = 'Regine';
const name = localStorage.getItem('name') || defaultName;

async function fetchPosts() {
    visibleLoader();
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}`); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const postsObject = await response.json();
        const postsArray = Object.values(postsObject);
        const postArray = postsArray[0];
        
        populateCarousel(postArray);
        showSlides(slideIndex);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    } finally {
        invisibleLoader();
    }
}

function populateCarousel(postsArray) {
    const container = document.querySelector('.carousel-slides');
    container.innerHTML = ''; 
    postsArray.forEach(post => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `
                <img src="${post.media.url}" alt="${post.title}">
                <div class="carousel-caption">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <a href='/post/index.html?id=${post.id}' class="read-more-carousel">Read More <i class="fa-solid fa-right-long"></i></a>
                </div>
            `;
            container.appendChild(item);
        });
    }


function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("carousel-item");

    if (slides.length === 0) {
        console.log('No slides to show.');
        return;
    }

    if (n > 3) {slideIndex = 1}
    if (n < 1) {slideIndex = 3}
    for (var i = 0; i <= 2; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', fetchPosts);

document.querySelector('.prev').addEventListener('click', function() {
    moveSlide(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    moveSlide(1);
});