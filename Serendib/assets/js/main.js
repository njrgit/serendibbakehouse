const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const toggleHeaderElevation = () => {
    if (!header) return;
    if (window.scrollY > 12) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

toggleHeaderElevation();
window.addEventListener('scroll', toggleHeaderElevation);

// Carousel functionality
document.querySelectorAll('.item-carousel').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    };

    const goToSlide = (index) => {
        const newIndex = (index + slides.length) % slides.length;
        updateCarousel(newIndex);
    };

    prevBtn?.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn?.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
});

