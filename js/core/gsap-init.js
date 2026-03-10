/* ═══════════════════════════════════════════════════════════
   js/core/gsap-init.js
   Register GSAP plugins & set global defaults
   Spider-Verse pop-art animations
═══════════════════════════════════════════════════════════ */

/**
 * Register GSAP ScrollTrigger and set defaults
 */
export function registerGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Global defaults for Spider-Verse bouncy/"pop" easing
    gsap.defaults({
        ease: 'back.out(1.7)',
        duration: 0.6,
    });

    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
    });
}

/**
 * Create a standard reveal animation for elements entering the viewport
 * Spider-Verse style: Scale from 90%, slight rotation, pop into place
 */
export function createScrollReveal(selector, opts = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el, i) => {
        // Add a random slight rotation for comic book feel
        const rot = (Math.random() - 0.5) * 4;

        gsap.fromTo(el,
            {
                opacity: 0,
                scale: 0.8,
                rotation: rot * 2,
                y: opts.y ?? 40,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                duration: opts.duration ?? 0.6,
                ease: 'back.out(1.5)',
                delay: opts.stagger ? i * opts.stagger : 0,
                scrollTrigger: {
                    trigger: el,
                    start: opts.start ?? 'top 85%',
                    end: opts.end ?? 'bottom 20%',
                    toggleClass: 'in-view',
                },
            }
        );
    });
}
