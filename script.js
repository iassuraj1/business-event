
// Mobile Drawer Toggle
const menuToggle = document.getElementById('menuToggle');
const drawerClose = document.getElementById('drawerClose');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);

// Header background change on scroll
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
});

// Dynamic Real-time Countdown Timer to Jan 18, 2026
// If the date has passed or for demonstration, calculates dynamically or provides lively ticks
const targetDate = new Date('2026-01-18T09:00:00');
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

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minsEl) minsEl.textContent = minutes;
        if (secsEl) secsEl.textContent = seconds;
    } else {
        // If demo target is in past, retain the exact screenshot display values and tick seconds
        let s = parseInt(secsEl?.textContent || '55');
        s = s <= 0 ? 59 : s - 1;
        if (secsEl) secsEl.textContent = s;
    }
}

// Run countdown timer tick every second
setInterval(updateCountdown, 1000);

// YouTube Video Modal Controls
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

// Schedule Day Tabs Switching
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

// Scroll To Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================================================
// Banner Slider Controller (Synchronized Image & Text Slide Motion)
// ==========================================================================
const heroSlider = document.getElementById('heroSlider');
const heroSliderTrack = document.getElementById('heroSliderTrack');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
const heroDots = document.querySelectorAll('.hero-dot');

let currentHeroSlide = 0;
const totalHeroSlides = heroSlides.length;
let heroSlideTimer = null;
const SLIDE_INTERVAL = 5500; // 5.5s autoplay interval

function updateHeroSlide(index) {
    if (!heroSlides.length || !heroSliderTrack) return;

    // Calculate wrapped circular index
    currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;

    // Shift the track horizontally so both image and text slide in unison
    heroSliderTrack.style.transform = `translateX(-${currentHeroSlide * 100}%)`;

    // Toggle active state to trigger micro-animations on text & heading
    heroSlides.forEach((slide, idx) => {
        if (idx === currentHeroSlide) {
            slide.classList.add('active');
            slide.setAttribute('aria-hidden', 'false');
        } else {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        }
    });

    // Update pagination dots
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

// Next and Prev Button Events
heroNextBtn?.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroAutoSlide();
});

heroPrevBtn?.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroAutoSlide();
});

// Dot Indicator Click Events
heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        updateHeroSlide(idx);
        resetHeroAutoSlide();
    });
});

// Pause Autoplay on Hover / Resume on Leave
heroSlider?.addEventListener('mouseenter', () => {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
});

heroSlider?.addEventListener('mouseleave', () => {
    startHeroAutoSlide();
});

// Keyboard Navigation (Left/Right Arrows)
window.addEventListener('keydown', (e) => {
    // Only trigger if no interactive modal or input is currently focused
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

// Touch Swipe Gestures for Mobile
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
    const swipeThreshold = 45; // Minimum px to count as swipe
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {
            // Swiped Left -> Next Slide
            nextHeroSlide();
        } else {
            // Swiped Right -> Previous Slide
            prevHeroSlide();
        }
        resetHeroAutoSlide();
    }
}

// Initialize Banner Slider
if (totalHeroSlides > 0) {
    updateHeroSlide(0);
    startHeroAutoSlide();
}

// Interactive Mobile/Click Toggle for Speaker Cards
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

// ==========================================================================
// Scroll Reveal: About Section Image slides in smoothly from right to left
// ==========================================================================
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

// ==========================================================================
// Testimonials Slider Controller (Wave Flow Track & Touch Navigation)
// ==========================================================================
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

        // Update dots
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

    // Touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
            if (diff > 0) nextSlide();
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


