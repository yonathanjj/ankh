document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Page Load Animations ---
    gsap.from('.page-header', { duration: 1, y: 30, opacity: 0, ease: 'power2.out' });
    gsap.from('.event-item', {
        duration: 0.8,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.event-list',
            start: 'top 85%',
        }
    });

    // --- Live Search Functionality ---
    const searchInput = document.getElementById('search-input');
    const allEventItems = document.querySelectorAll('.event-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        allEventItems.forEach(eventItem => {
            const title = eventItem.dataset.title.toLowerCase();
            const description = eventItem.querySelector('.event-details p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                eventItem.style.display = 'flex';
            } else {
                eventItem.style.display = 'none';
            }
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('event-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const notificationForm = document.getElementById('notification-form');

    // GSAP Timeline for smooth animation
    const modalTl = gsap.timeline({ paused: true });
    modalTl
        .to(modal, { duration: 0.4, css: { display: 'grid' }, autoAlpha: 1, ease: 'power2.inOut' })
        .from(modalContent, { duration: 0.4, y: -40, opacity: 0, ease: 'power2.out' }, "-=0.2");

    function openModal(eventItem) {
        const title = eventItem.dataset.title;
        const description = eventItem.dataset.description;
        const date = eventItem.dataset.date;
        const time = eventItem.dataset.time;
        const location = eventItem.dataset.location;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalDetails.innerHTML = `
            <span>Date: ${date}</span>
            <span>Time: ${time}</span>
            <span>Location: ${location}</span>
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
        item.addEventListener('click', () => {
            openModal(item);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'grid') {
            closeModal();
        }
    });

    notificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button');
        button.textContent = 'Thank You!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            closeModal();
             setTimeout(() => {
                button.textContent = 'Notify Me';
                button.style.backgroundColor = '';
                e.target.querySelector('input').value = '';
             }, 500);
        }, 1500);
    });
});