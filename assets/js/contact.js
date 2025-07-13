document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // --- Page Load & Scroll Animations ---
    const animateFrom = (selector, options) => {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 1, y: 50, opacity: 0, ease: 'power2.out', ...options
        });
    };

    // Animate hero on page load
    gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })
        .from('.hero-text > *', { y: 50, opacity: 0, stagger: 0.2 })
        .from('.hero-image', { opacity: 0, scale: 1.05 }, '-=0.8');

    // Animate other sections on scroll
    animateFrom('.contact-section h2');
    animateFrom('.contact-container');
    animateFrom('.map-section');
    animateFrom('.faq-section h2');
    animateFrom('.faq-container');


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        // Set initial state
        if (!item.classList.contains('active')) {
            gsap.set(answer, { maxHeight: 0, paddingTop: 0 });
        } else {
            gsap.set(answer, { maxHeight: answer.scrollHeight, paddingTop: '1.5rem' });
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            if (!isActive) {
                faqItems.forEach(otherItem => {
                    if (otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        gsap.to(otherItem.querySelector('.faq-answer'), { duration: 0.4, maxHeight: 0, paddingTop: 0, ease: 'power2.inOut' });
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
            }

            // Toggle the clicked item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                toggle.textContent = '–';
                gsap.to(answer, { duration: 0.5, maxHeight: answer.scrollHeight, paddingTop: '1.5rem', ease: 'power2.out' });
            } else {
                toggle.textContent = '+';
                gsap.to(answer, { duration: 0.4, maxHeight: 0, paddingTop: 0, ease: 'power2.inOut' });
            }
        });
    });
});