

document.addEventListener('DOMContentLoaded', () => {
    const eventsData = {
        'default': {
            title: 'Digital Marketing Conference',
            category: 'Marketing',
            date: 'January 10, 2025',
            time: '6:30 pm - 9:00 pm',
            phone: '+1 (1234) - 567-890',
            location: 'New York City',
            venue: 'Cineplex Hall',
            email: 'info@gmail.com',
            image: './assets/events/event-detail-hero.jpg',
            mainHeading: 'Aimply dummy text of the printing and typeset ting irem Ipsum has been theardtrullam',
            subHeading: 'Digital Working Events Information'
        },
        'innovate-2027': {
            title: 'Innovate 2027: Digital Transformation & AI',
            category: 'Technology',
            date: '23 March 2027',
            time: '09:00 am – 10:00 am',
            phone: '+1 (1234) - 567-890',
            location: 'Apple Upper West Side, Brooklyn',
            venue: 'Main Tech Hall',
            email: 'info@sapphireitsg.com',
            image: './assets/upcoming-event-1.jpg',
            mainHeading: 'Pioneering Digital Transformation and Applied AI in Enterprise Architecture',
            subHeading: 'Next-Generation Artificial Intelligence Workflows'
        },
        'cultures-creativity': {
            title: 'Cultures of Creativity & Innovation Expo',
            category: 'Innovation',
            date: '15 April 2027',
            time: '10:00 am – 11:30 am',
            phone: '+1 (1234) - 567-890',
            location: 'Manhattan Club NYC',
            venue: 'Grand Innovation Suite',
            email: 'info@sapphireitsg.com',
            image: './assets/upcoming-event-2.jpg',
            mainHeading: 'Fostering Collaborative Ecosystems and Disruptive Creative Problem Solving',
            subHeading: 'Creative Enterprise Culture and Ideation Sessions'
        },
        'design-systems': {
            title: 'UI/UX Design Systems & Modern Architecture',
            category: 'Design',
            date: '10 May 2027',
            time: '01:00 pm – 03:00 pm',
            phone: '+1 (1234) - 567-890',
            location: 'Innovation Pavilion C, Brooklyn',
            venue: 'Design Loft Studio',
            email: 'info@sapphireitsg.com',
            image: './assets/upcoming-event-4.jpg',
            mainHeading: 'Building Scalable Modern UI Systems and Accessible Interfaces at Enterprise Scale',
            subHeading: 'Systemic Component Engineering and Design Tokens'
        },
        'marketing-summit': {
            title: 'World Marketing Summit 2026 (Live Broadcast)',
            category: 'Marketing',
            date: '18-20 Sep 2026',
            time: '09:30 am – 05:00 pm',
            phone: '+1 (1234) - 567-890',
            location: 'Main Stage Auditorium, NYC',
            venue: 'Global Broadcast Arena',
            email: 'info@sapphireitsg.com',
            image: './assets/gallery/gallery-5.jpg',
            mainHeading: 'Executive Keynotes, Omnichannel Brand Strategies, and Global Growth Insights',
            subHeading: 'Omnichannel Conversion and Retention Masterclass'
        },
        'ai-operations': {
            title: 'AI In Marketing Operations & Cloud Intelligence',
            category: 'Artificial Intelligence',
            date: '18 Sep 2026',
            time: '11:00 am – 12:30 pm',
            phone: '+1 (1234) - 567-890',
            location: 'Innovation Hall A, NYC',
            venue: 'Cloud Lab Center',
            email: 'info@sapphireitsg.com',
            image: './assets/gallery/gallery-4.jpg',
            mainHeading: 'Automated Neural Intelligence, Cloud Infrastructure, and Scalable Workflows',
            subHeading: 'Technical Workshop on Algorithmic Automation'
        },
        'enterprise-cloud': {
            title: 'Enterprise Cloud & DevOps World Summit',
            category: 'Cloud & DevOps',
            date: '12 Dec 2025',
            time: 'Full-Day Symposium',
            phone: '+1 (1234) - 567-890',
            location: 'Tech Center, Brooklyn NYC',
            venue: 'DevOps Theater 1',
            email: 'info@sapphireitsg.com',
            image: './assets/gallery/gallery-7.jpg',
            mainHeading: 'Kubernetes Scale Strategies, Multi-Cloud Governance, and CI/CD Security',
            subHeading: 'Enterprise Infrastructure Architecture Recap'
        },
        'sustainable-leadership': {
            title: 'Sustainable Enterprise Development & Green Tech',
            category: 'Sustainability',
            date: '18 Nov 2025',
            time: 'Concluded Session',
            phone: '+1 (1234) - 567-890',
            location: 'Auditorium West, Brooklyn',
            venue: 'Green Innovation Hall',
            email: 'info@sapphireitsg.com',
            image: './assets/gallery/gallery-8.jpg',
            mainHeading: 'Global Corporate ESG Frameworks, Clean-Energy Centers, and Eco-Tech Initiatives',
            subHeading: 'Corporate Environmental Responsibility'
        },
        'marketing-matters': {
            title: 'Marketing Matters! Growth Architecture 2025',
            category: 'Growth Strategy',
            date: '05 Oct 2025',
            time: 'Concluded Session',
            phone: '+1 (1234) - 567-890',
            location: 'Grand Ballroom 2, NYC',
            venue: 'Ballroom Suite A',
            email: 'info@sapphireitsg.com',
            image: './assets/upcoming-event-3.jpg',
            mainHeading: 'Data-Driven Growth Models, High-Velocity Acquisition, and Brand Performance',
            subHeading: 'High-Impact Brand Velocity & Architecture'
        }
    };

    // Load data from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id') || 'default';
    const activeEvent = eventsData[eventId] || eventsData['default'];

    // Update page elements if customized
    const heroTitleEl = document.getElementById('eventDetailsHeroTitle');
    const breadcrumbCurrentEl = document.getElementById('eventDetailsBreadcrumb');
    const heroImgEl = document.getElementById('eventDetailsHeroImg');
    const mainHeadingEl = document.getElementById('eventDetailsMainHeading');
    const subHeadingEl = document.getElementById('eventDetailsSubHeading');

    // Sidebar Info elements
    const infoCategoryEl = document.getElementById('infoCategory');
    const infoDateEl = document.getElementById('infoDate');
    const infoTimeEl = document.getElementById('infoTime');
    const infoPhoneEl = document.getElementById('infoPhone');
    const infoLocationEl = document.getElementById('infoLocation');
    const infoVenueEl = document.getElementById('infoVenue');
    const infoEmailEl = document.getElementById('infoEmail');

    if (heroTitleEl) heroTitleEl.textContent = activeEvent.title;
    if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = activeEvent.title;
    if (heroImgEl && activeEvent.image) heroImgEl.src = activeEvent.image;
    if (mainHeadingEl && eventId !== 'default') mainHeadingEl.textContent = activeEvent.mainHeading;
    if (subHeadingEl && eventId !== 'default') subHeadingEl.textContent = activeEvent.subHeading;

    if (infoCategoryEl) infoCategoryEl.textContent = activeEvent.category;
    if (infoDateEl) infoDateEl.textContent = activeEvent.date;
    if (infoTimeEl) infoTimeEl.textContent = activeEvent.time;
    if (infoPhoneEl) infoPhoneEl.textContent = activeEvent.phone;
    if (infoLocationEl) infoLocationEl.textContent = activeEvent.location;
    if (infoVenueEl) infoVenueEl.textContent = activeEvent.venue;
    if (infoEmailEl) infoEmailEl.textContent = activeEvent.email;


    const passSelect = document.getElementById('regPassSelect');
    const priceAmountEl = document.getElementById('regPriceAmount');
    const stepperMinusBtn = document.getElementById('stepperMinus');
    const stepperPlusBtn = document.getElementById('stepperPlus');
    const stepperValEl = document.getElementById('stepperVal');
    const summaryQtyEl = document.getElementById('summaryQuantity');
    const summaryTotalEl = document.getElementById('summaryTotalCost');

    let currentQty = 2; // default 02 as in screenshot
    let unitPrice = 29.00;

    const passPrices = {
        'silver': 29.00,
        'gold': 59.00,
        'vip': 99.00
    };

    function updateCalculations() {
        const total = unitPrice * currentQty;
        if (priceAmountEl) {
            priceAmountEl.textContent = `$${unitPrice.toFixed(2)}`;
        }
        if (stepperValEl) {
            stepperValEl.textContent = currentQty;
        }
        if (summaryQtyEl) {
            summaryQtyEl.textContent = currentQty < 10 ? `0${currentQty}` : currentQty;
        }
        if (summaryTotalEl) {
            summaryTotalEl.textContent = `$${total.toFixed(2)}`;
        }
    }

    if (passSelect) {
        passSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            unitPrice = passPrices[val] || 29.00;
            updateCalculations();
        });
    }

    if (stepperPlusBtn) {
        stepperPlusBtn.addEventListener('click', () => {
            if (currentQty < 20) {
                currentQty++;
                updateCalculations();
            }
        });
    }

    if (stepperMinusBtn) {
        stepperMinusBtn.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                updateCalculations();
            }
        });
    }

    // Initialize display with 02 quantity and $58.00 as shown in screenshot
    updateCalculations();

    // =========================================================================
    // Purchase Modal Interaction
    // =========================================================================
    const purchaseBtn = document.getElementById('btnPurchaseNow');
    const modalBackdrop = document.getElementById('eventModalBackdrop');
    const modalCloseBtn = document.getElementById('eventModalClose');
    const modalOkBtn = document.getElementById('eventModalOk');
    const modalEventTitleEl = document.getElementById('modalEventTitle');
    const modalTicketsEl = document.getElementById('modalTicketsSummary');

    if (purchaseBtn && modalBackdrop) {
        purchaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalEventTitleEl) modalEventTitleEl.textContent = activeEvent.title;
            if (modalTicketsEl) {
                const passName = passSelect ? passSelect.options[passSelect.selectedIndex].text : 'Silver Pass';
                modalTicketsEl.textContent = `${currentQty}x ${passName} — Total: $${(unitPrice * currentQty).toFixed(2)}`;
            }
            modalBackdrop.style.display = 'flex';
        });
    }

    function closeModal() {
        if (modalBackdrop) modalBackdrop.style.display = 'none';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }

    // Speaker Details button click handling
    const speakerButtons = document.querySelectorAll('.btn-speaker-details');
    speakerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const speakerName = btn.getAttribute('data-speaker') || 'Speaker';
            alert(`Speaker Profile: ${speakerName}\nMarketing Leadership & Global Keynote Presenter.`);
        });
    });

    // =========================================================================
    // Event Media (Images & Videos) Filter & Lightbox Interactions
    // =========================================================================
    const mediaFilterBtns = document.querySelectorAll('.media-filter-btn');
    const mediaCards = document.querySelectorAll('.event-media-card');

    // Filter Tabs
    mediaFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mediaFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetFilter = btn.getAttribute('data-media-filter') || 'all';

            mediaCards.forEach(card => {
                const cardType = card.getAttribute('data-media-type');
                if (targetFilter === 'all' || cardType === targetFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Photo Lightbox
    const photoModal = document.getElementById('mediaImageModal');
    const photoImg = document.getElementById('mediaLightboxImg');
    const photoTitle = document.getElementById('mediaLightboxTitle');
    const photoCloseBtn = document.getElementById('mediaImgClose');
    const photoBackdrop = document.getElementById('mediaImgBackdrop');

    function openPhoto(src, caption) {
        if (!src) return;
        if (photoImg) photoImg.src = src;
        if (photoTitle) photoTitle.textContent = caption || 'Event Photograph';
        if (photoModal) {
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePhoto() {
        if (photoModal) {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (photoCloseBtn) photoCloseBtn.addEventListener('click', closePhoto);
    if (photoBackdrop) photoBackdrop.addEventListener('click', closePhoto);

    // Video Player Modal
    const videoModal = document.getElementById('eventVideoModal');
    const videoIframe = document.getElementById('eventVideoIframe');
    const videoCloseBtn = document.getElementById('eventVideoClose');
    const videoBackdrop = document.getElementById('eventVideoBackdrop');

    function openVideo(url) {
        if (!url) return;
        if (videoIframe) videoIframe.src = url;
        if (videoModal) {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideo() {
        if (videoIframe) videoIframe.src = '';
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeVideo);
    if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideo);

    // Bind card clicks
    mediaCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-media-type');
            if (type === 'image') {
                const src = card.getAttribute('data-media-src');
                const caption = card.getAttribute('data-media-caption');
                openPhoto(src, caption);
            } else if (type === 'video') {
                const url = card.getAttribute('data-video-url');
                openVideo(url);
            }
        });
    });

    // Universal Escape key listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (photoModal && photoModal.classList.contains('active')) closePhoto();
            if (videoModal && videoModal.classList.contains('active')) closeVideo();
            if (modalBackdrop && modalBackdrop.style.display === 'flex') closeModal();
        }
    });
});

