// Nav scroll
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Video mute toggle
let isMuted = true;
let userUnmuted = false; // tracks if user deliberately turned sound on

function setMuted(muted) {
    const video = document.getElementById('hero-video');
    isMuted = muted;
    video.muted = isMuted;
    document.getElementById('icon-muted').style.display = isMuted ? 'block' : 'none';
    document.getElementById('icon-unmuted').style.display = isMuted ? 'none' : 'block';
    document.getElementById('mute-label').textContent = isMuted ? 'Ton an' : 'Ton aus';
}

function toggleMute() {
    userUnmuted = isMuted; // if it was muted and user clicks, they're unmuting
    setMuted(!isMuted);
}

// Keep mute button above footer when scrolled down
const muteBtn = document.getElementById('mute-btn');
const footer = document.querySelector('footer');

function updateMuteBtnPosition() {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const btnHeight = muteBtn.offsetHeight;
    const defaultBottom = window.innerWidth <= 900 ? 24 : 35; // matches your CSS rem values in px

    if (footerTop < windowHeight) {
        // footer is visible — push button up above it
        const overlap = windowHeight - footerTop;
        muteBtn.style.bottom = (overlap + 12) + 'px';
    } else {
        muteBtn.style.bottom = defaultBottom + 'px';
    }
}

window.addEventListener('scroll', updateMuteBtnPosition, { passive: true });
window.addEventListener('resize', updateMuteBtnPosition);
updateMuteBtnPosition();

// Mobile menu
function toggleMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu');
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// Fade-in observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = (i * 0.1) + 's';
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Lightbox gallery
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