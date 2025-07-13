document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP ---
    // Register GSAP plugins for use
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. REUSABLE ANIMATION FUNCTION ---
    // This helper function keeps our code clean and consistent.
    const animateFrom = (selector, options) => {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2, // Default stagger for items in a group
            ease: 'power2.out',
            ...options, // Allows for custom overrides
        });
    };

    // --- 3. PAGE ANIMATIONS ---

    // Animate the main page header on load
    animateFrom('.page-header', { stagger: 0, duration: 1 });

    // Animate each events section as it scrolls into view
    document.querySelectorAll('.events-section').forEach((section) => {
        // Animate the header of the section first
        animateFrom(section.querySelector('.section-header'), {
            trigger: section, // Ensure trigger is the section itself
            stagger: 0.1
        });
        // Then, animate the event items within that section
        animateFrom(section.querySelectorAll('.event-item'), {
            trigger: section.querySelector('.event-list'), // Trigger when the list appears
        });
    });

    // Animate the dark Call-to-Action section
    animateFrom('.dark-section', {
        y: 80, // A slightly stronger vertical animation
        duration: 1
    });


    // --- 4. LIVE SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('search-input');
    const allEventItems = document.querySelectorAll('.event-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            allEventItems.forEach(eventItem => {
                const title = (eventItem.dataset.title || '').toLowerCase();
                const description = (eventItem.querySelector('.event-details p')?.textContent || '').toLowerCase();

                // Use includes() for a partial match
                const isMatch = title.includes(searchTerm) || description.includes(searchTerm);

                // Animate visibility for a smoother filtering effect
                gsap.to(eventItem, {
                    duration: 0.3,
                    opacity: isMatch ? 1 : 0,
                    height: isMatch ? 'auto' : 0,
                    display: isMatch ? 'flex' : 'none',
                    ease: 'power2.out'
                });
            });
        });
    }

    // --- 5. MODAL LOGIC (WITH GSAP ANIMATION) ---
    const modal = document.getElementById('event-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Check if modal elements exist to prevent errors on other pages
    if (modal && closeModalBtn) {
        const modalContent = modal.querySelector('.modal-content');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDetails = document.getElementById('modal-details');
        const notificationForm = document.getElementById('notification-form');

        // GSAP Timeline for smooth open/close animations
        const modalTl = gsap.timeline({ paused: true, reversed: true });
        modalTl
            .to(modal, { duration: 0.4, autoAlpha: 1, display: 'grid', ease: 'power2.inOut' })
            .from(modalContent, { duration: 0.4, y: -30, opacity: 0, ease: 'power2.out' }, "-=0.2");

        function openModal(eventItem) {
            // Populate modal with data from the clicked event item
            modalTitle.textContent = eventItem.dataset.title || 'Event Details';
            modalDescription.textContent = eventItem.dataset.description || 'More information coming soon.';
            modalDetails.innerHTML = `
                <span>Date: ${eventItem.dataset.date || 'TBA'}</span>
                <span>Time: ${eventItem.dataset.time || 'TBA'}</span>
                <span>Location: ${eventItem.dataset.location || 'TBA'}</span>
            `;

            modalTl.play();
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalTl.reverse();
            document.body.style.overflow = '';
        }

        // --- Event Listeners ---
        allEventItems.forEach(item => {
            // Using a more specific selector for the click target
            const clickTarget = item.querySelector('.event-image') || item;
            clickTarget.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default link behavior
                openModal(item);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalTl.isActive()) closeModal();
        });

        if (notificationForm) {
            notificationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button');
                button.textContent = 'Thank You!';
                button.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    closeModal();
                    // Reset the form after the modal is closed
                    setTimeout(() => {
                        button.textContent = 'Notify Me';
                        button.style.backgroundColor = '';
                        e.target.querySelector('input').value = '';
                    }, 500);
                }, 1500);
            });
        }
    }
}); // End of DOMContentLoaded