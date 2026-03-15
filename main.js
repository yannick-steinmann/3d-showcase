import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector(".experience-canvas"))

// Custom cursor (desktop only)
const cursor = document.querySelector('.custom-cursor');
if (cursor && window.matchMedia('(min-width: 969px)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, .video-wrapper, .image-wrapper').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// Scroll progress bar
const scrollProgress = document.querySelector('.scroll-progress');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
if (scrollProgress && scrollProgressBar) {
    const page = document.querySelector('.page');
    const observer = new MutationObserver(() => {
        if (page && page.style.overflow === 'visible') {
            initScrollProgress();
            observer.disconnect();
        }
    });
    observer.observe(page, { attributes: true, attributeFilter: ['style'] });
}

function initScrollProgress() {
    const page = document.querySelector('.page');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');

    scrollProgress.style.opacity = '1';

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = page.querySelector('.page-wrapper').scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Section reveal on scroll
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.section-heading, .section-text, .image-wrapper, .video-wrapper');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Start reveal observer once page becomes scrollable
const pageEl = document.querySelector('.page');
if (pageEl) {
    const revealObserver = new MutationObserver(() => {
        if (pageEl.style.overflow === 'visible') {
            initRevealOnScroll();
            revealObserver.disconnect();
        }
    });
    revealObserver.observe(pageEl, { attributes: true, attributeFilter: ['style'] });
}
