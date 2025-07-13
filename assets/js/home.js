document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP PLUGIN REGISTRATION ---
    gsap.registerPlugin(ScrollTrigger);

    // --- COMPONENT LOGIC ---

    // 1. Magazine & Blog Post Modal
    const magazineModal = {
        modalEl: document.getElementById('magazine-modal'),
        imageEl: document.getElementById('modal-image'),
        titleEl: document.getElementById('modal-title'),
        issueEl: document.getElementById('modal-issue'),
        descriptionEl: document.getElementById('modal-description'),
        readNowBtn: document.getElementById('read-now-btn'),
        closeBtn: document.querySelector('#magazine-modal .close-modal'),
        timeline: gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } }),

        init() {
            if (!this.modalEl) return;
            this.timeline
                .to(this.modalEl, { duration: 0.3, autoAlpha: 1 })
                .from(this.modalEl.querySelector('.modal-layout'), { duration: 0.4, scale: 0.9, opacity: 0 }, "-=0.2");
        },
        open(card) {
            this.imageEl.src = card.querySelector('img').src;
            this.titleEl.textContent = card.dataset.title;
            this.issueEl.textContent = card.dataset.issue;
            this.descriptionEl.textContent = card.dataset.description;
            this.readNowBtn.href = card.dataset.readUrl;
            this.timeline.play();
            document.body.style.overflow = 'hidden';
        },
        close() {
            this.timeline.reverse();
            document.body.style.overflow = '';
        }
    };
    magazineModal.init();

    // 2. Event Modal
    const eventModal = {
        modalEl: document.getElementById('event-modal'),
        titleEl: document.getElementById('event-modal-title'),
        descriptionEl: document.getElementById('event-modal-description'),
        detailsEl: document.getElementById('event-modal-details'),
        form: document.getElementById('notification-form'),
        closeBtn: document.querySelector('#event-modal .close-event-modal'),
        timeline: gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } }),

        init() {
            if (!this.modalEl) return;
            this.timeline
                .to(this.modalEl, { duration: 0.4, autoAlpha: 1 })
                .from(this.modalEl.querySelector('.modal-content'), { duration: 0.4, y: -30, opacity: 0 }, "-=0.2");
        },
        open(item) {
            this.titleEl.textContent = item.dataset.title;
            this.descriptionEl.textContent = item.dataset.description;
            this.detailsEl.innerHTML = `
                <span>Date: ${item.dataset.date}</span>
                <span>Time: ${item.dataset.time}</span>
                <span>Location: ${item.dataset.location}</span>
            `;
            this.timeline.play();
            document.body.style.overflow = 'hidden';
        },
        close() {
            this.timeline.reverse();
            document.body.style.overflow = '';
        }
    };
    eventModal.init();

    // 3. Student of the Week Slider
    const studentSlider = {
        // CORRECTED IMAGE PATHS
        data: [
            { name: "Rahel Tadesse", image: "assets/img/student1.png", course: "Film Making & Directing", achievement: "Directed her first short film in just 8 weeks.", quote: "I never thought I'd have the confidence or the tools to create something meaningful. Ankh gave me both — and more.", instagram: "https://www.instagram.com/" },
            { name: "Daniel Abebe", image: "assets/img/student2.png", course: "Advanced Makeup Artistry", achievement: "Booked as lead makeup artist for a major fashion show.", quote: "The hands-on practice was incredible. I went from novice to professional in one course.", instagram: "https://www.instagram.com/" },
            { name: "Hana Girma", image: "assets/img/student3.png", course: "Modeling & Self-Presentation", achievement: "Signed with a top modeling agency.", quote: "Ankh taught me more than just how to walk; they taught me how to own the room.", instagram: "https://www.instagram.com/" }
        ],
        currentIndex: 0,
        imageStack: document.querySelector('.sotw-image-stack'),
        nameEl: document.getElementById('sotw-name'),
        courseEl: document.getElementById('sotw-course'),
        achievementEl: document.getElementById('sotw-achievement'),
        quoteEl: document.getElementById('sotw-quote'),
        instagramLink: document.getElementById('sotw-instagram'),
        prevBtn: document.getElementById('sotw-prev'),
        nextBtn: document.getElementById('sotw-next'),

        init() {
            if (!this.imageStack) return;
            this.update();
        },
        update() {
            const student = this.data[this.currentIndex];
            this.nameEl.textContent = student.name;
            this.courseEl.textContent = student.course;
            this.achievementEl.textContent = student.achievement;
            // Update quote without adding extra quotes if they exist
            this.quoteEl.textContent = student.quote.startsWith('"') ? student.quote : `"${student.quote}"`;
            this.instagramLink.href = student.instagram;

            const images = this.imageStack.querySelectorAll('.slide-image');
            images.forEach((img, index) => {
                img.classList.remove('active', 'prev', 'next');
                if (index === this.currentIndex) img.classList.add('active');
                else if (index === (this.currentIndex - 1 + images.length) % images.length) img.classList.add('prev');
                else if (index === (this.currentIndex + 1) % images.length) img.classList.add('next');
            });
        },
        goNext() {
            this.currentIndex = (this.currentIndex + 1) % this.data.length;
            this.update();
        },
        goPrev() {
            this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
            this.update();
        }
    };
    studentSlider.init();

    // --- SETUP EVENT LISTENERS ---
    function setupEventListeners() {
        document.body.addEventListener('click', (e) => {
            const magazineCard = e.target.closest('.clickable-card');
            if (magazineCard) magazineModal.open(magazineCard);

            const eventItem = e.target.closest('.event-item');
            if (eventItem) eventModal.open(eventItem);
        });

        if(magazineModal.modalEl) {
            magazineModal.closeBtn.addEventListener('click', () => magazineModal.close());
            magazineModal.modalEl.addEventListener('click', (e) => { if (e.target === magazineModal.modalEl) magazineModal.close(); });
        }

        if(eventModal.modalEl) {
            eventModal.closeBtn.addEventListener('click', () => eventModal.close());
            eventModal.modalEl.addEventListener('click', (e) => { if (e.target === eventModal.modalEl) eventModal.close(); });
            eventModal.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button');
                button.textContent = 'Thank You!';
                button.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    eventModal.close();
                    setTimeout(() => {
                        button.textContent = 'Notify Me';
                        button.style.backgroundColor = '';
                        e.target.querySelector('input').value = '';
                    }, 500);
                }, 1500);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (magazineModal.modalEl && magazineModal.modalEl.style.visibility === 'visible') magazineModal.close();
                if (eventModal.modalEl && eventModal.modalEl.style.visibility === 'visible') eventModal.close();
            }
        });

        if (studentSlider.nextBtn) studentSlider.nextBtn.addEventListener('click', () => studentSlider.goNext());
        if (studentSlider.prevBtn) studentSlider.prevBtn.addEventListener('click', () => studentSlider.goPrev());
    }

    // --- SETUP SCROLL-BASED ANIMATIONS ---
    function setupScrollAnimations() {
        const animateFrom = (selector, options) => {
            gsap.from(selector, {
                scrollTrigger: { trigger: selector, start: 'top 85%', toggleActions: 'play none none none' },
                duration: 0.8, opacity: 0, y: 50, ease: 'power2.out', ...options
            });
        };

        // NEW Hero Section Animation (on page load)
        gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })
            .from('.hero-content h1', { y: 50, opacity: 0 })
            .from('.hero-content .subtitle', { y: 40, opacity: 0 }, '-=0.7')
            .from('.scroll-down-indicator', { y: 20, opacity: 0 }, '-=0.5');

        // Animate Sections on Scroll
        animateFrom('.recent-magazines-section .section-title');
        animateFrom('.recent-magazine-grid .magazine-item', { stagger: 0.15 });

        animateFrom('.services-section .section-title', { x: -50, y: 0 });
        animateFrom('.services-section .service-item', { stagger: 0.1 });

        animateFrom('.upcoming-events-section .section-title');
        animateFrom('.upcoming-events-section .event-item', { stagger: 0.2 });

        animateFrom('.testimonials-intro', { x: -50, y: 0, trigger: '.testimonials-section' });
        animateFrom('.scrolling-testimonials-wrapper', { x: 50, y: 0, trigger: '.testimonials-section' });

        animateFrom('.sotw-section .section-title');
        animateFrom('.sotw-slider');
        animateFrom('.sotw-content');

        animateFrom('.referral-section .section-title', { x: -50, y: 0 });
        animateFrom('.referral-card', { scale: 0.95 });
    }

    // --- INITIALIZE EVERYTHING ---
    setupScrollAnimations();
    setupEventListeners();
});