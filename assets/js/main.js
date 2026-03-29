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

// ── Menu item modal ──
const modal        = document.getElementById('item-modal');
const modalTitle   = document.getElementById('modal-title');
const modalDesc    = document.getElementById('modal-desc');
const modalClose   = modal?.querySelector('.item-modal-close');
const modalBackdrop = modal?.querySelector('.item-modal-backdrop');
const modalViewport = modal?.querySelector('.item-modal-carousel .carousel-viewport');
const modalDotsWrap = modal?.querySelector('.item-modal-carousel .carousel-dots');
const modalPrev    = modal?.querySelector('.item-modal-carousel .carousel-prev');
const modalNext    = modal?.querySelector('.item-modal-carousel .carousel-next');

let modalCurrentIndex = 0;
let modalSlides = [];
let modalDots = [];

function modalGoTo(index) {
    const n = modalSlides.length;
    if (!n) return;
    modalCurrentIndex = (index + n) % n;
    modalSlides.forEach((s, i) => s.classList.toggle('active', i === modalCurrentIndex));
    modalDots.forEach((d, i) => d.classList.toggle('active', i === modalCurrentIndex));
}

function openModal(card) {
    const images = card.dataset.images.split(',');
    const alts   = card.dataset.alts.split(',');

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent  = card.dataset.desc;

    // Build slides
    modalViewport.innerHTML = '';
    modalDotsWrap.innerHTML = '';
    modalSlides = [];
    modalDots   = [];

    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src   = src.trim();
        img.alt   = alts[i]?.trim() ?? '';
        img.className = 'carousel-slide' + (i === 0 ? ' active' : '');
        modalViewport.appendChild(img);
        modalSlides.push(img);

        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => modalGoTo(i));
        modalDotsWrap.appendChild(dot);
        modalDots.push(dot);
    });

    modalCurrentIndex = 0;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
}

if (modal) {
    // Show/hide carousel controls based on slide count
    modalPrev?.addEventListener('click', () => modalGoTo(modalCurrentIndex - 1));
    modalNext?.addEventListener('click', () => modalGoTo(modalCurrentIndex + 1));
    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (modal.hasAttribute('hidden')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft')  modalGoTo(modalCurrentIndex - 1);
        if (e.key === 'ArrowRight') modalGoTo(modalCurrentIndex + 1);
    });

    document.querySelectorAll('.menu-card').forEach((card) => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });
}

