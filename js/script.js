function toggleCategory(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
    } else {
        content.classList.add('expanded');
    }
}

function showSlide(carouselId, index) {
    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    const slides = carousel.querySelector('.carousel-images');
    const totalSlides = carousel.querySelectorAll('.carousel-images img').length;
    let currentIndex = parseInt(carousel.getAttribute('data-current-index')) || 0;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const translateX = -currentIndex * 100;
    slides.style.transform = `translateX(${translateX}%)`;
    carousel.setAttribute('data-current-index', currentIndex);
}

function nextSlide(event, carouselId) {
    event.stopPropagation();
    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    let currentIndex = parseInt(carousel.getAttribute('data-current-index')) || 0;
    showSlide(carouselId, currentIndex + 1);
}

function prevSlide(event, carouselId) {
    event.stopPropagation();
    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    let currentIndex = parseInt(carousel.getAttribute('data-current-index')) || 0;
    showSlide(carouselId, currentIndex - 1);
}

let touchStartX = 0;
let touchEndX = 0;

function handleSwipeStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleSwipeMove(event) {
    touchEndX = event.changedTouches[0].screenX;
}

function handleSwipeEnd(event, carouselId) {
    if (touchEndX < touchStartX) {
        nextSlide(event, carouselId);
    }
    if (touchEndX > touchStartX) {
        prevSlide(event, carouselId);
    }
}


window.onload = function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const carouselId = carousel.getAttribute('data-carousel');

        carousel.querySelectorAll('.carousel-image').forEach(image => {
            image.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevents the project from collapsing when clicking an image
            });
        });

        carousel.addEventListener('touchstart', handleSwipeStart, false);
        carousel.addEventListener('touchmove', handleSwipeMove, false);
        carousel.addEventListener('touchend', (event) => handleSwipeEnd(event, carouselId), false);
    });
};
