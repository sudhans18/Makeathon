/* ═══════════════════════════════════════════════════════════
   js/sponsorship-tiers.js
   Standalone script for the sponsorship tiers sub-page.
   Handles card entrance animations and interactive effects.
═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // --- Intersection Observer for staggered card reveals ---
    const cards = document.querySelectorAll('.tier-card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    cards.forEach((card) => {
        observer.observe(card);
    });

    // --- Tilt effect on hover ---
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // --- Nav scroll shadow ---
    const nav = document.querySelector('.comic-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                nav.style.boxShadow = '';
            }
        });
    }

    console.log('[Makeathon 7.0] Sponsorship Tiers page loaded.');
})();
