document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const videoIframe = document.getElementById('videoIframe');
    const filterBtns = document.querySelectorAll('.sub-filter-btn');
    const videoCards = document.querySelectorAll('.gallery-video-card');

    function openVideo(url) {
        if (!url) return;
        if (videoIframe) {
            videoIframe.src = url;
        }
        if (videoModal) {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideo() {
        if (videoIframe) {
            videoIframe.src = '';
        }
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-video-url');
            openVideo(url);
        });
    });

    modalCloseBtn?.addEventListener('click', closeVideo);
    modalBackdrop?.addEventListener('click', closeVideo);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
            closeVideo();
        }
    });

    // Sub-category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetFilter = btn.getAttribute('data-filter') || 'all';

            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (targetFilter === 'all' || cardCategory === targetFilter) {
                    card.style.display = 'flex';
                    card.classList.add('gallery-item-revealed');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
