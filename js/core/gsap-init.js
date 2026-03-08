/* ═══════════════════════════════════════════════════════════
   js/core/gsap-init.js
   Register GSAP plugins & set global defaults
   
   Usage: import { registerGSAP } from './gsap-init.js'
═══════════════════════════════════════════════════════════ */

/**
 * Register GSAP ScrollTrigger and set defaults
 */
export function registerGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Global defaults for consistent easing
    gsap.defaults({
        ease: 'power2.out',
        duration: 0.8,
    });

    // Default ScrollTrigger config
    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
    });
}

/**
 * Create a standard reveal animation for elements entering the viewport
 * @param {string} selector - CSS selector for target elements
 * @param {object} [opts] - Optional overrides
 */
export function createScrollReveal(selector, opts = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el, i) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: opts.y ?? 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: opts.duration ?? 0.8,
                delay: opts.stagger ? i * (opts.stagger) : 0,
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
