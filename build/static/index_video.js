// Nav scroll
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Auto-mute when hero is fully scrolled out of view
const heroSection = document.getElementById('hero');
window.addEventListener('scroll', () => {
    if (!isMuted && heroSection.getBoundingClientRect().bottom <= 0) {
        userUnmuted = false;
        setMuted(true);
    }
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

// Lightbox
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });