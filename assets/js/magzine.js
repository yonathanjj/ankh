document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.magazine-cover', {
        scrollTrigger: { trigger: '.magazine-grid', start: 'top 85%', },
        duration: 0.8, opacity: 0, y: 40, stagger: 0.1, ease: 'power2.out'
    });

    const searchInput = document.getElementById('search-input');
    const categoryCheckboxes = document.querySelectorAll('.category-filters input[name="category"]');
    const allMagazines = document.querySelectorAll('.magazine-cover');
    const loadMoreBtn = document.getElementById('load-more-btn');

    function filterMagazines() {
        const searchTerm = searchInput.value.toLowerCase();
        const checkedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked).map(cb => cb.value);

        allMagazines.forEach(magazine => {
            const isInitiallyHidden = magazine.classList.contains('initially-hidden');
            const title = magazine.dataset.title.toLowerCase();
            const categories = magazine.dataset.category.split(' ');

            const matchesCategory = checkedCategories.length === 0 || checkedCategories.some(cat => categories.includes(cat));
            const matchesSearch = title.includes(searchTerm);

            // Hide or show logic
            if (matchesCategory && matchesSearch) {
                if (!isInitiallyHidden) magazine.style.display = 'block';
            } else {
                magazine.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterMagazines);
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterMagazines));

    loadMoreBtn.addEventListener('click', () => {
        const hiddenItems = Array.from(document.querySelectorAll('.magazine-cover.initially-hidden'));
        const itemsToLoad = hiddenItems.slice(0, 4);

        if (itemsToLoad.length > 0) {
            itemsToLoad.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('initially-hidden');
                gsap.from(item, { duration: 0.5, opacity: 0, y: 30 });
            });
            filterMagazines();
        }
        if (document.querySelectorAll('.magazine-cover.initially-hidden').length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // --- Modal Logic ---
    const modal = document.getElementById('magazine-modal');
    const modalLayout = document.querySelector('.modal-layout');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalIssue = document.getElementById('modal-issue');
    const modalDescription = document.getElementById('modal-description');
    const readNowBtn = document.getElementById('read-now-btn');

    const modalTl = gsap.timeline({ paused: true });
    modalTl
        .to(modal, { duration: 0.4, css: { display: 'grid' }, autoAlpha: 1 })
        .from(modalLayout, { duration: 0.4, scale: 0.95, opacity: 0, ease: 'power2.out' }, "-=0.2");

    function openModal(magazineElement) {
        modalImage.src = magazineElement.querySelector('img').src;
        modalTitle.textContent = magazineElement.dataset.title;
        modalIssue.textContent = magazineElement.dataset.issue;
        modalDescription.textContent = magazineElement.dataset.description;
        readNowBtn.href = magazineElement.dataset.readUrl;

        modalTl.play();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalTl.reverse();
        document.body.style.overflow = '';
    }

    document.querySelector('.magazine-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('preview-btn')) {
            openModal(e.target.closest('.magazine-cover'));
        }
    });
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});