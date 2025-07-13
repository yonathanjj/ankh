document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP ---
    // Register GSAP plugins for use
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. GSAP SCROLL-TRIGGERED ANIMATIONS ---

    // Animate header and hero image on initial page load
    gsap.timeline()
        .from('.page-header h2, .page-header p', { duration: 1, opacity: 0, y: 30, stagger: 0.2, ease: 'power2.out' })
        .from('.hero-image', { duration: 1.2, opacity: 0, scale: 1.05, ease: 'power3.out' }, "-=0.8");

    // Animate info items as they scroll into view
    document.querySelectorAll('.info-item, .core-values').forEach(item => {
        gsap.from(item.children, {
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
            duration: 0.9, opacity: 0, y: 30, stagger: 0.15, ease: 'power2.out'
        });
    });

    // Animate team section on scroll
    gsap.from('.team-section .team-header, .team-layout', {
        scrollTrigger: { trigger: '.team-section', start: 'top 80%', toggleActions: 'play none none none' },
        duration: 1.2, opacity: 0, y: 50, stagger: 0.2, ease: 'power2.out'
    });

    // Animate clients section title
    gsap.from('.clients-content h2', {
        scrollTrigger: { trigger: '.clients-section-wrapper', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 1, opacity: 0, y: 40, ease: 'power2.out'
    });

    // --- NEW: Dynamic scroll animation for Focus Area Cards ---
    // This will animate each card with a slight 3D rotation as it enters the screen
    gsap.from('.focus-card', {
        scrollTrigger: {
            trigger: '.focus-grid-horizontal',
            start: 'top 80%', // Starts animation when the grid is 80% from the top
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 60, // A bit more distance for a stronger effect
        rotationX: -10, // A slight rotation on the X-axis
        stagger: 0.15,  // Animate cards one after another
        ease: 'power2.out'
    });


    // --- 3. COMPONENT-SPECIFIC INTERACTIVITY ---

    // A. Leadership Team Hover Interaction
    const teamMembers = document.querySelectorAll('.team-member');
    const teamListItems = document.querySelectorAll('.team-list li');
    const photoContainer = document.querySelector('.team-photos-artistic');

    if (teamMembers.length > 0 && teamListItems.length > 0) {
        const resetHighlights = () => {
            teamListItems.forEach(li => li.classList.remove('highlight'));
        };

        teamMembers.forEach(memberPhoto => {
            const memberId = memberPhoto.dataset.member;
            const correspondingListItem = document.querySelector(`.team-list li[data-member="${memberId}"]`);

            memberPhoto.addEventListener('mouseenter', () => {
                if (correspondingListItem) {
                    resetHighlights();
                    correspondingListItem.classList.add('highlight');
                }
            });
        });

        if (photoContainer) {
            photoContainer.addEventListener('mouseleave', resetHighlights);
        }
    }


    // B. Client Slider Hover-Pause Logic
    // This correctly relies on the superior CSS animation and only uses JS to pause/play it.
    const clientTrack = document.querySelector('.clients-track');
    if (clientTrack) {
        clientTrack.addEventListener('mouseenter', () => {
            clientTrack.style.animationPlayState = 'paused';
        });

        clientTrack.addEventListener('mouseleave', () => {
            clientTrack.style.animationPlayState = 'running';
        });
    }

}); // End of DOMContentLoaded