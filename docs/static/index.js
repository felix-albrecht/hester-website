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

function openLightbox(src) {
    currentLightboxIndex = galleryImgs.findIndex(img => img.src === src);
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function lightboxNav(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryImgs.length) % galleryImgs.length;
    document.getElementById('lightbox-img').src = galleryImgs[currentLightboxIndex].src;
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
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = '' }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); })