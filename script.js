const menuToggle = document.getElementById('menuToggle');
const drawerClose = document.getElementById('drawerClose');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function openDrawer() {
    mobileDrawer?.classList.add('active');
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    drawerBackdrop?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    drawerBackdrop?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);

document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        closeDrawer();
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && (mobileDrawer.classList.contains('active') || mobileDrawer.classList.contains('open'))) {
        closeDrawer();
    }
});

const siteHeader = document.getElementById('siteHeader');
const headerSticky = document.getElementById('header-sticky');

window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 40;
    if (headerSticky) {
        headerSticky.classList.toggle('header-sticky', isScrolled);
    }
    if (siteHeader) {
        siteHeader.classList.toggle('scrolled', isScrolled);
    }
});

const targetDate = new Date('2026-11-18T09:00:00');
const daysEl = document.getElementById('timerDays');
const hoursEl = document.getElementById('timerHours');
const minsEl = document.getElementById('timerMins');
const secsEl = document.getElementById('timerSecs');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    } else {
        let s = parseInt(secsEl?.textContent || '55');
        s = s <= 0 ? 59 : s - 1;
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
        if (daysEl && (daysEl.textContent === '00' || !daysEl.textContent)) daysEl.textContent = '60';
        if (hoursEl && (hoursEl.textContent === '00' || !hoursEl.textContent)) hoursEl.textContent = '14';
        if (minsEl && (minsEl.textContent === '00' || !minsEl.textContent)) minsEl.textContent = '35';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const playVideoBtn = document.getElementById('playVideoBtn');
const videoCard = document.getElementById('videoCard');
const videoModal = document.getElementById('videoModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const videoIframe = document.getElementById('videoIframe');
const demoVideoUrl = 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0';

function openVideoModal() {
    if (videoIframe) {
        videoIframe.src = demoVideoUrl;
    }
    videoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    if (videoIframe) {
        videoIframe.src = '';
    }
    videoModal?.classList.remove('active');
    document.body.style.overflow = '';
}

playVideoBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openVideoModal();
});

videoCard?.addEventListener('click', openVideoModal);
modalCloseBtn?.addEventListener('click', closeVideoModal);
modalBackdrop?.addEventListener('click', closeVideoModal);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
        closeVideoModal();
    }
});

const scheduleTabs = document.querySelectorAll('.schedule-tab');
const schedulePanes = document.querySelectorAll('.schedule-day-pane');

scheduleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        if (!targetId) return;

        scheduleTabs.forEach((t) => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        schedulePanes.forEach((p) => p.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const targetPane = document.querySelector(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const heroSlider = document.getElementById('tdHeroSlider') || document.getElementById('heroSlider');
const heroSlides = document.querySelectorAll('.td-hero-3-slide, .hero-slide');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
const heroDots = document.querySelectorAll('.hero-dot');

let currentHeroSlide = 0;
const totalHeroSlides = heroSlides.length;
let heroSlideTimer = null;
const SLIDE_INTERVAL = 5500;

function updateHeroSlide(index) {
    if (!heroSlides.length) return;

    currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;

    heroSlides.forEach((slide, idx) => {
        if (idx === currentHeroSlide) {
            slide.classList.add('active');
            slide.setAttribute('aria-hidden', 'false');

            // Force restart of Ken Burns zoom animation on active background
            const bg = slide.querySelector('.td-hero-3-bg');
            if (bg) {
                bg.style.animation = 'none';
                bg.offsetHeight; // trigger reflow
                bg.style.animation = '';
            }

            // Force restart of entrance animations on active elements
            const animElements = slide.querySelectorAll('.text, .text2, .text3');
            animElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // trigger reflow
                el.style.animation = '';
            });
        } else {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        }
    });

    heroDots.forEach((dot, idx) => {
        const isActive = idx === currentHeroSlide;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
}

function nextHeroSlide() {
    updateHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
    updateHeroSlide(currentHeroSlide - 1);
}

function startHeroAutoSlide() {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
    if (totalHeroSlides > 1) {
        heroSlideTimer = setInterval(nextHeroSlide, SLIDE_INTERVAL);
    }
}

function resetHeroAutoSlide() {
    startHeroAutoSlide();
}

heroNextBtn?.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroAutoSlide();
});

heroPrevBtn?.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroAutoSlide();
});

heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        updateHeroSlide(idx);
        resetHeroAutoSlide();
    });
});

heroSlider?.addEventListener('mouseenter', () => {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
});

heroSlider?.addEventListener('mouseleave', () => {
    startHeroAutoSlide();
});

window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') return;

    if (e.key === 'ArrowRight') {
        nextHeroSlide();
        resetHeroAutoSlide();
    } else if (e.key === 'ArrowLeft') {
        prevHeroSlide();
        resetHeroAutoSlide();
    }
});

// Initialize auto slide
if (totalHeroSlides > 1) {
    startHeroAutoSlide();
}

let touchStartX = 0;
let touchEndX = 0;

heroSlider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSlider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleTouchSwipe();
}, { passive: true });

function handleTouchSwipe() {
    const swipeThreshold = 45;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {

            nextHeroSlide();
        } else {

            prevHeroSlide();
        }
        resetHeroAutoSlide();
    }
}

if (totalHeroSlides > 0) {
    updateHeroSlide(0);
    startHeroAutoSlide();
}

const speakerCards = document.querySelectorAll('.speaker-card');
speakerCards.forEach((card) => {
    card.addEventListener('click', (e) => {
        const isCurrentlyActive = card.classList.contains('is-active');
        speakerCards.forEach((c) => c.classList.remove('is-active'));
        if (!isCurrentlyActive) {
            card.classList.add('is-active');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.speaker-card')) {
        speakerCards.forEach((c) => c.classList.remove('is-active'));
    }
});

const aboutImageCard = document.querySelector('.about-event-section .left-content');

if (aboutImageCard) {
    if ('IntersectionObserver' in window) {
        const aboutImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        aboutImageObserver.observe(aboutImageCard);
    } else {
        aboutImageCard.classList.add('in-view');
    }
}

(function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrevBtn');
    const nextBtn = document.getElementById('testimonialNextBtn');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-card-slide');
    const totalSlides = slides.length;
    if (!totalSlides) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function getMaxIndex() {
        const visible = getVisibleCards();
        return Math.max(0, totalSlides - visible);
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const maxIndex = getMaxIndex();
        const totalDots = maxIndex + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = `testimonial-dot ${i === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const visible = getVisibleCards();
        const cardPercentage = 100 / visible;
        track.style.transform = `translateX(-${currentIndex * cardPercentage}%)`;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, idx) => {
                const isActive = idx === currentIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }
    }

    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        if (index > maxIndex) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    const sliderWrap = track.closest('.testimonials-slider-wrap');
    if (sliderWrap) {
        sliderWrap.addEventListener('mouseenter', stopAutoSlide);
        sliderWrap.addEventListener('mouseleave', startAutoSlide);
        sliderWrap.addEventListener('touchstart', stopAutoSlide, { passive: true });
        sliderWrap.addEventListener('touchend', startAutoSlide, { passive: true });
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    track.addEventListener('touchstart', (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) nextSlide();
            else prevSlide();
            resetAutoSlide();
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        createDots();
        updateSlider();
    });

    createDots();
    updateSlider();
    startAutoSlide();
})();

(function initHomeBlogs() {
    const homeBlogGrid = document.getElementById('homeBlogGrid');
    if (!homeBlogGrid || typeof blogs === 'undefined' || !Array.isArray(blogs)) return;

    homeBlogGrid.innerHTML = blogs.slice(0, 3).map(blog => `
        <article class="blog-card">
            <div class="blog-img-wrap">
                <img src="${blog.image}" alt="${blog.title}" class="blog-img" loading="lazy">
                <div class="blog-img-overlay">
                    <a href="blogs.html?slug=${blog.slug}" class="blog-plus-btn" aria-label="View ${blog.title}">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                </div>
                <span class="blog-category button-style">${blog.category || 'EVENT'}</span>
            </div>
            <div class="blog-content">
                <h3 class="blog-card-title">
                    <a href="blogs.html?slug=${blog.slug}">${blog.title}</a>
                </h3>
                <div class="blog-meta">
                    <span class="blog-meta-item">
                        <i class="bi bi-calendar-event"></i>
                        <span>${blog.date}</span>
                    </span>
                    <span class="blog-meta-item">
                        <i class="bi bi-chat-left-text"></i>
                        <span>${blog.comments || '12 Comments'}</span>
                    </span>
                </div>
                <a href="blogs.html?slug=${blog.slug}" class="button-style blog-view-details">
                    view details
                </a>
            </div>
        </article>
    `).join('');
})();
