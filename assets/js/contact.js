document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP Page Load Animations ---
    const tl = gsap.timeline();

    tl.from('.hero-text h1, .hero-text p', {
        duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out'
    });
    tl.from('.hero-image', {
        duration: 1, opacity: 0, scale: 1.05, ease: 'power3.out'
    }, "-=0.8");

    gsap.from('.contact-section h2, .contact-container, .faq-section h2, .faq-container', {
        duration: 1, y: 40, opacity: 0, stagger: 0.3, ease: 'power2.out',
    });

    // --- GSAP Gradient Circle Animation ---
    gsap.to('.circle-1', { duration: 15, x: '+=50', y: '+=30', repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.circle-2', { duration: 20, x: '-=40', y: '-=60', repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.circle-3', { duration: 18, x: '+=20', y: '-=40', repeat: -1, yoyo: true, ease: 'sine.inOut' });


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (!item.classList.contains('active')) {
            gsap.set(answer, { maxHeight: 0 });
        } else {
            gsap.set(answer, { maxHeight: answer.scrollHeight + 40 });
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            item.classList.toggle('active');
            if (isActive) {
                toggle.textContent = '+';
                gsap.to(answer, { duration: 0.4, maxHeight: 0, ease: 'power2.inOut' });
            } else {
                toggle.textContent = '–';
                gsap.to(answer, { duration: 0.5, maxHeight: answer.scrollHeight + 40, ease: 'power2.out' });
            }
        });
    });
});