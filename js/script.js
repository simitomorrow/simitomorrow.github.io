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

window.onload = function() {
    document.querySelectorAll('.dontClose').forEach(image => {
        image.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });
};
