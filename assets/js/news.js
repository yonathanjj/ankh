document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Trailing Label Cursor Logic (Customized) ---
    const cursorContainer = document.querySelector('.cursor-container');
    const cursorLabel = document.querySelector('.cursor-text-label');
    const interactiveElements = document.querySelectorAll('a, button, .news-post, .close-modal');

    // Move the entire cursor container
    window.addEventListener('mousemove', e => {
        gsap.to(cursorContainer, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
            ease: 'power2.out'
        });
    });

    // Handle hover effects
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // MODIFICATION: Always use the word "SELECT" for all interactions.
            // This is more universal than "OPEN" or "READ".
            cursorLabel.textContent = 'SELECT';
            cursorContainer.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorContainer.classList.remove('cursor-hover');
        });
    });


    // --- Original Page Load Animation (Unchanged) ---
    gsap.from('.news-post', {
        duration: 0.7,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        ease: 'power2.out'
    });


    // --- Original Modal Logic (Unchanged) ---
    const newsPosts = document.querySelectorAll('.news-post');
    const modal = document.getElementById('news-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.querySelector('.modal-content');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const modalExcerpt = document.getElementById('modal-excerpt');
    const modalFullContent = document.getElementById('modal-full-content');

    const modalTl = gsap.timeline({ paused: true });
    modalTl
        .to(modal, { duration: 0.4, css: { display: 'grid' }, autoAlpha: 1, ease: 'power2.inOut' })
        .from(modalContent, { duration: 0.4, y: -40, opacity: 0, ease: 'power2.out' }, "-=0.2");

    const openModal = (post) => {
        const imageSrc = post.querySelector('img').src;
        const titleText = post.dataset.title;
        const authorText = post.dataset.author;
        const dateText = post.dataset.date;
        const excerptText = post.dataset.excerpt;
        const fullContentText = post.dataset.content;

        modalImage.src = imageSrc;
        modalTitle.textContent = titleText;
        modalAuthor.textContent = `By ${authorText}`;
        modalDate.textContent = `Published on ${dateText}`;
        modalExcerpt.textContent = excerptText;
        modalFullContent.textContent = fullContentText;

        modalTl.play();
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalTl.reverse();
        document.body.style.overflow = '';
    };

    newsPosts.forEach(post => {
        post.addEventListener('click', () => {
            openModal(post);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'grid') {
            closeModal();
        }
    });
});