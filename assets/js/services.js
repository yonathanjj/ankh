document.addEventListener('DOMContentLoaded', () => {

    // --- Infinite Marquee Slider (stops on hover) ---
    const sliderComponent = document.querySelector('.slider-component');

    if (sliderComponent) {
        const sliderWrapper = sliderComponent.querySelector('.slider-wrapper');
        const originalCards = sliderWrapper.querySelectorAll('.service-card');

        if (originalCards.length === 0) return;

        // 1. CLONE ALL CARDS for a seamless loop
        // The wrapper will now contain two full sets of cards.
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            sliderWrapper.appendChild(clone);
        });

        // 2. CALCULATE THE TOTAL WIDTH of the original set of cards
        let totalWidth = 0;
        originalCards.forEach(card => {
            // Add the card's full width including its margin
            totalWidth += card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
        });

        // 3. CREATE THE GSAP TWEEN for the animation
        // We animate the wrapper's x position by the total width of one set of cards.
        let tween = gsap.to(sliderWrapper, {
            x: -totalWidth,       // Move left by the width of the original set
            duration: 25,         // The time it takes to scroll through one set (adjust as needed)
            ease: "none",         // A constant, linear speed is crucial for a smooth marquee
            repeat: -1,           // Repeat the animation infinitely
        });

        // 4. ADD HOVER-TO-PAUSE FUNCTIONALITY
        sliderComponent.addEventListener('mouseenter', () => {
            tween.pause();
        });

        sliderComponent.addEventListener('mouseleave', () => {
            tween.resume();
        });
    }

    // --- Events & Promotion Automatic Slider (Handles Multiple Instances) ---

    // Find ALL sections that are meant to be sliders
    const promoSections = document.querySelectorAll('.events-promotion-section');

    // Loop through each section and initialize it as a separate slider
    promoSections.forEach(section => {
        // IMPORTANT: Find elements *within the current section*
        const promoSlidesContainer = section.querySelector('.promo-slides');
        const dotsContainer = section.querySelector('.promo-dots');

        if (promoSlidesContainer && dotsContainer) {
            const slides = Array.from(promoSlidesContainer.querySelectorAll('.promo-slide'));
            let currentSlide = 0;
            let slideInterval;

            // Only proceed if there are slides to show
            if (slides.length > 0) {
                // Create dots for this specific slider
                slides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.classList.add('promo-dot');
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', () => {
                        goToPromoSlide(i);
                        resetInterval();
                    });
                    dotsContainer.appendChild(dot);
                });

                const dots = dotsContainer.querySelectorAll('.promo-dot');

                // This function now only affects the slides and dots within its own section
                function goToPromoSlide(index) {
                    slides[currentSlide].classList.remove('active');
                    dots[currentSlide].classList.remove('active');
                    currentSlide = (index + slides.length) % slides.length;
                    slides[currentSlide].classList.add('active');
                    dots[currentSlide].classList.add('active');
                }

                // This function resets the interval timer for this specific slider
                function resetInterval() {
                    clearInterval(slideInterval);
                    slideInterval = setInterval(() => goToPromoSlide(currentSlide + 1), 3000);
                }

                // Initialize the slider
                goToPromoSlide(0);
                resetInterval();
            }
        }
    });

    // --- Magazine Pop-up Modal Logic ---
    const magazineModal = document.getElementById('magazine-modal');
    if (magazineModal) {
        const modalLayout = magazineModal.querySelector('.modal-layout');
        const closeModalBtn = magazineModal.querySelector('.close-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalIssue = document.getElementById('modal-issue');
        const modalDescription = document.getElementById('modal-description');
        const readNowBtn = document.getElementById('read-now-btn');

        const modalTl = gsap.timeline({ paused: true });
        modalTl.to(magazineModal, { autoAlpha: 1, duration: 0.4, display: 'grid' })
               .from(modalLayout, { scale: 0.95, opacity: 0, duration: 0.4, ease: 'power2.out' }, "-=0.2");

        function openMagazineModal(magazineElement) {
            modalImage.src = magazineElement.querySelector('img').src;
            modalTitle.textContent = magazineElement.dataset.title;
            modalIssue.textContent = magazineElement.dataset.issue;
            modalDescription.textContent = magazineElement.dataset.description;
            readNowBtn.href = "#";

            modalTl.play();
            document.body.style.overflow = 'hidden';
        }

        function closeMagazineModal() {
            modalTl.reverse();
            document.body.style.overflow = '';
        }

        document.querySelector('.magazine-grid').addEventListener('click', (e) => {
            if (e.target.classList.contains('preview-btn')) {
                openMagazineModal(e.target.closest('.magazine-cover'));
            }
        });

        closeModalBtn.addEventListener('click', closeMagazineModal);
        magazineModal.addEventListener('click', (e) => { if (e.target === magazineModal) closeMagazineModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && magazineModal.style.display === 'grid') closeMagazineModal(); });
    }
});