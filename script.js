
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

// Hero Background Image Slider with Prev/Next Controls
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
let currentHeroSlide = 0;
let heroSlideTimer = null;

function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide) => slide.classList.remove('active'));
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
}

function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
}

function startHeroAutoSlide() {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(nextHeroSlide, 5000);
}

function resetHeroAutoSlide() {
    clearInterval(heroSlideTimer);
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

// Initialize auto slide if slides exist
if (heroSlides.length > 1) {
    startHeroAutoSlide();
}
