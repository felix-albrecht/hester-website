const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60) });

const heroBg = document.getElementById('hero-bg');
setTimeout(() => heroBg.classList.add('loaded'), 100);

function toggleMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu');
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : ''
}

const observer = new IntersectionObserver((entries) => { entries.forEach((e, i) => { if (e.isIntersecting) { e.target.style.transitionDelay = (i * 0.1) + 's'; e.target.classList.add('visible'); observer.unobserve(e.target) } }) }, { threshold: 0.12 }); document.querySelectorAll('.fade-in').forEach(el => observer.observe(el)); // Lightbox gallery
const galleryImgs = Array.from(document.querySelectorAll('.gallery-strip img'));
let currentLightboxIndex = 0;

// Event gallery data — add filenames for each event folder
async function openEventGallery(folder) {
    try {
        const res = await fetch(folder + '/index.json');
        const filenames = await res.json();
        if (!filenames || filenames.length === 0) return;
        eventGalleryImages = filenames.map(f => folder + '/' + f);
        currentLightboxIndex = 0;
        showLightboxImage(eventGalleryImages[0]);
        updateLightboxCounter();
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
    } catch (e) {
        console.warn('Could not load gallery for', folder, e);
    }
}

let eventGalleryImages = [];

function openLightbox(src) {
    // build gallery from the strip images
    eventGalleryImages = galleryImgs.map(img => img.src);
    currentLightboxIndex = galleryImgs.findIndex(img => img.src === src);
    showLightboxImage(eventGalleryImages[currentLightboxIndex]);
    updateLightboxCounter();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function lightboxNav(direction) {
    if (eventGalleryImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + eventGalleryImages.length) % eventGalleryImages.length;
    showLightboxImage(eventGalleryImages[currentLightboxIndex]);
    updateLightboxCounter();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    eventGalleryImages = [];
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft') lightboxNav(-1);
});

// Infinite gallery scroll — clone items for seamless wrap
const strip = document.querySelector('.gallery-strip');
const items = Array.from(strip.children);
items.forEach(img => strip.appendChild(img.cloneNode(true)));

strip.addEventListener('scroll', () => {
    if (strip.scrollLeft >= strip.scrollWidth / 2) {
        strip.scrollLeft -= strip.scrollWidth / 2;
    } else if (strip.scrollLeft === 0) {
        strip.scrollLeft = strip.scrollWidth / 2;
    }
});

// Start in the middle so both directions work immediately
strip.scrollLeft = strip.scrollWidth / 2;

function showLightboxImage(src) {
    document.getElementById('lightbox-img').src = src;
}

function updateLightboxCounter() {
    let counter = document.getElementById('lightbox-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'lightbox-counter';
        counter.className = 'lightbox-counter';
        document.getElementById('lightbox').appendChild(counter);
    }
    counter.textContent = (currentLightboxIndex + 1) + ' / ' + eventGalleryImages.length;
}