document.addEventListener('DOMContentLoaded', () => {
    // --- Course Filtering Logic ---
    const filterContainer = document.querySelector('.filter-buttons');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // Update active button state
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filter = e.target.dataset.category;

                courseCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (filter === 'all' || cardCategory === filter) {
                        gsap.to(card, { autoAlpha: 1, duration: 0.5, display: 'flex' });
                    } else {
                        gsap.to(card, { autoAlpha: 0, duration: 0.5, display: 'none' });
                    }
                });
            }
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('course-modal');
    if (modal) {
        const closeModalBtn = modal.querySelector('.close-modal');

        // Modal content placeholders
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImagesGrid = document.getElementById('modal-images-grid');
        const modalDuration = document.getElementById('modal-duration');
        const modalSchedule = document.getElementById('modal-schedule');
        const modalTuition = document.getElementById('modal-tuition');
        const modalTuitionIncludes = document.getElementById('modal-tuition-includes');
        const modalModules = document.getElementById('modal-modules');
        const modalBenefits = document.getElementById('modal-benefits');

        const modalTl = gsap.timeline({ paused: true });
        modalTl.to(modal, { autoAlpha: 1, duration: 0.3, display: 'grid' })
               .from(modal.querySelector('.modal-content'), { y: 30, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

        function openModal(cardElement) {
            const cardData = cardElement.dataset;

            // Populate modal with data from the clicked card
            modalTitle.textContent = cardData.title;
            modalDescription.textContent = cardData.description;
            modalDuration.textContent = cardData.duration;
            modalSchedule.textContent = cardData.schedule;
            modalTuition.textContent = cardData.tuition;
            modalTuitionIncludes.textContent = cardData.tuitionIncludes;

            // Create image grid HTML from the comma-separated data attribute
            modalImagesGrid.innerHTML = cardData.images.split(',')
                .map(src => `<img src="${src.trim()}" alt="${cardData.title} feature image">`)
                .join('');

            // Create list item HTML from the pipe-separated data attributes
            modalModules.innerHTML = cardData.modules.split('|')
                .map(item => `<li>${item.trim()}</li>`)
                .join('');

            modalBenefits.innerHTML = cardData.benefits.split('|')
                .map(item => `<li>${item.trim()}</li>`)
                .join('');

            modalTl.play();
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalTl.reverse();
            document.body.style.overflow = '';
        }

        // Add event listeners for all "Learn more" buttons
        document.querySelectorAll('.learn-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.course-card');
                openModal(card);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modal.style.display === 'grid') {
                closeModal();
            }
        });
    }
});