document.addEventListener('DOMContentLoaded', () => {

    // --- Service Card Horizontal Slider ---
    const serviceSlider = document.querySelector('.slider-wrapper');
    if (serviceSlider) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const cards = serviceSlider.querySelectorAll('.service-card');
        let currentIndex = 0;

        function updateServiceSlider() {
            let cardsInView;
            if (window.innerWidth <= 768) {
                cardsInView = 1;
            } else if (window.innerWidth <= 992) {
                cardsInView = 2;
            } else if (window.innerWidth <= 1200) {
                 cardsInView = 3;
            } else {
                 cardsInView = 4;
            }

            const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
            const maxIndex = cards.length - cardsInView;
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

            const offset = -currentIndex * cardWidth;
            gsap.to(serviceSlider, { x: offset, duration: 0.6, ease: 'power3.inOut' });

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        nextBtn.addEventListener('click', () => { currentIndex++; updateServiceSlider(); });
        prevBtn.addEventListener('click', () => { currentIndex--; updateServiceSlider(); });

        window.addEventListener('resize', updateServiceSlider);
        updateServiceSlider();
    }

    // --- Events & Promotion Automatic Slider ---
    const promoSlidesContainer = document.querySelector('.promo-slides');
    if (promoSlidesContainer) {
        const slides = Array.from(promoSlidesContainer.querySelectorAll('.promo-slide'));
        const dotsContainer = document.querySelector('.promo-dots');
        let currentSlide = 0;
        let slideInterval;

        if (slides.length > 0) {
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

            function goToPromoSlide(index) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = (index + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => goToPromoSlide(currentSlide + 1), 3000);
            }

            goToPromoSlide(0);
            resetInterval();
        }
    }

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