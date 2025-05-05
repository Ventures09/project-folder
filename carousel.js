let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.gallery-item');
    const totalSlides = slides.length;
    
    // Update slideIndex based on direction (step: 1 or -1)
    slideIndex = (slideIndex + step + totalSlides) % totalSlides;
    
    // Move the gallery by changing the transform property
    const gallery = document.querySelector('.gallery');
    gallery.style.transform = `translateX(-${slideIndex * 33.333}%)`;
}
