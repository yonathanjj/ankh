document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Scroll-Triggered Animations ---

    // Animate header and hero image
    gsap.from('.page-header h2, .page-header p, .hero-image', {
        duration: 1, opacity: 0, y: 30, stagger: 0.2,
        ease: 'power2.out'
    });

    // Animate info items on scroll
    document.querySelectorAll('.info-item').forEach(item => {
        gsap.from(item.children, {
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
            duration: 0.9, opacity: 0, y: 30, stagger: 0.15,
            ease: 'power2.out'
        });
    });

    // Animate core values section
     gsap.from('.core-values, .values-grid', {
        scrollTrigger: { trigger: '.core-values', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 1, opacity: 0, y: 30, stagger: 0.2,
        ease: 'power2.out'
    });

    // Animate focus area cards on scroll
    gsap.from('.focus-card', {
        scrollTrigger: { trigger: '.focus-grid-horizontal', start: 'top 80%', toggleActions: 'play none none none' },
        duration: 0.7, opacity: 0, y: 40, stagger: 0.15,
        ease: 'power2.out'
    });

    // Animate team section on scroll
    gsap.from('.team-section .team-header, .team-layout', {
        scrollTrigger: { trigger: '.team-section', start: 'top 80%', toggleActions: 'play none none none' },
        duration: 1.2, opacity: 0, y: 50, stagger: 0.2,
        ease: 'power2.out'
    });

    // Animate clients section on scroll
    gsap.from('.clients-content h2, .clients-slider', {
        scrollTrigger: { trigger: '.clients-section-wrapper', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 1, opacity: 0, y: 40, stagger: 0.2,
        ease: 'power2.out'
    });


    // --- Leadership Team Hover Interaction ---
    const teamMembers = document.querySelectorAll('.team-member');
    const teamListItems = document.querySelectorAll('.team-list li');

    function setDefaultState() {
        teamListItems.forEach(li => {
            li.style.opacity = '0.5';
            li.classList.remove('highlight');
        });
    }

    setDefaultState();

    teamMembers.forEach(memberPhoto => {
        const memberId = memberPhoto.dataset.member;
        const correspondingListItem = document.querySelector(`.team-list li[data-member="${memberId}"]`);

        memberPhoto.addEventListener('mouseenter', () => {
            setDefaultState();

            if (correspondingListItem) {
                correspondingListItem.style.opacity = '1';
                correspondingListItem.classList.add('highlight');
            }
        });
    });

    const photoContainer = document.querySelector('.team-photos-artistic');
    if (photoContainer) {
        photoContainer.addEventListener('mouseleave', () => {
            setDefaultState();
        });
    }
});



