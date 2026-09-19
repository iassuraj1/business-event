document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxBadge = document.getElementById('lightboxBadge');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let itemsData = [];
    let currentIndex = 0;

    function refreshLightboxItems() {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.gallery-item-hidden)');
        itemsData = [];

        visibleItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const itemObj = {
                src: img ? img.src : '',
                alt: img ? (img.alt || `Summit Moment ${index + 1}`) : `Summit Moment ${index + 1}`
            };
            itemsData.push(itemObj);

            const card = item.querySelector('.gallery-card');
            if (card && !card.dataset.lightboxBound) {
                card.dataset.lightboxBound = 'true';
                card.addEventListener('click', () => {

                    const currentVisible = Array.from(document.querySelectorAll('.gallery-item:not(.gallery-item-hidden)'));
                    const itemIdx = currentVisible.indexOf(item);
                    openLightbox(itemIdx !== -1 ? itemIdx : 0);
                });
            }
        });
    }

    refreshLightboxItems();

    const filterBtns = document.querySelectorAll('.sub-filter-btn');
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const targetFilter = btn.getAttribute('data-filter') || 'all';

                const allItems = document.querySelectorAll('.gallery-item');
                allItems.forEach(item => {
                    const cat = item.getAttribute('data-category');
                    if (targetFilter === 'all' || cat === targetFilter) {
                        item.classList.remove('gallery-item-hidden');
                        item.classList.add('gallery-item-revealed');
                    } else {
                        item.classList.add('gallery-item-hidden');
                    }
                });

                refreshLightboxItems();
            });
        });
    }

    if (loadMoreBtn) {
        const BATCH_SIZE = 6;

        loadMoreBtn.addEventListener('click', () => {
            const hiddenItems = Array.from(document.querySelectorAll('.gallery-item.gallery-item-hidden'));
            if (!hiddenItems.length) return;

            const btnText = loadMoreBtn.querySelector('.btn-text');
            const btnIcon = loadMoreBtn.querySelector('.btn-icon');
            const originalText = btnText ? btnText.textContent : 'View More Moments';

            if (btnText) btnText.textContent = 'Loading More Moments...';
            if (btnIcon) btnIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            loadMoreBtn.disabled = true;

            setTimeout(() => {
                const batch = hiddenItems.slice(0, BATCH_SIZE);

                batch.forEach((item, i) => {
                    item.classList.remove('gallery-item-hidden');
                    item.classList.add('gallery-item-revealed');
                    item.style.animationDelay = `${i * 0.08}s`;
                });

                refreshLightboxItems();

                const remaining = document.querySelectorAll('.gallery-item.gallery-item-hidden').length;
                if (remaining === 0) {
                    if (btnText) btnText.textContent = 'All Moments Loaded';
                    if (btnIcon) btnIcon.innerHTML = '<i class="bi bi-check2-circle"></i>';
                    loadMoreBtn.disabled = true;
                } else {
                    if (btnText) btnText.textContent = originalText;
                    if (btnIcon) btnIcon.innerHTML = '<i class="bi bi-arrow-down-circle"></i>';
                    loadMoreBtn.disabled = false;
                }
            }, 350);
        });
    }

    if (!lightbox) return;

    function openLightbox(index) {
        if (!itemsData.length) return;
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const data = itemsData[currentIndex];
        if (!data) return;

        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = data.src;
            lightboxImg.alt = data.alt;
            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentIndex + 1} / ${itemsData.length}`;
            }
            if (lightboxTitle) {
                lightboxTitle.textContent = data.alt;
            }
            if (lightboxBadge) {
                lightboxBadge.textContent = 'Summit Highlight';
            }
            if (lightboxDesc) {
                lightboxDesc.textContent = 'Exclusive capture from the Sapphire Business Summit 2026.';
            }
            lightboxImg.style.opacity = '1';
        }, 120);
    }

    function showPrev() {
        if (!itemsData.length) return;
        currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
        updateLightboxContent();
    }

    function showNext() {
        if (!itemsData.length) return;
        currentIndex = (currentIndex + 1) % itemsData.length;
        updateLightboxContent();
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxBackdrop?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    lightboxNext?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
