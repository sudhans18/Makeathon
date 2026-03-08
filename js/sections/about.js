/* ═══════════════════════════════════════════════════════════
   js/sections/about.js
   About / Briefing Deck section animations
   
   Key scroll triggers:
   - Mission log cards stagger-reveal on scroll
   - Parallax orbit visuals shift at different rates
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

/**
 * Initialize the About section animations
 */
export function initAbout() {
    revealMissionLogs();
    parallaxOrbits();
}

/**
 * Stagger-reveal mission log cards as they enter viewport
 */
function revealMissionLogs() {
    createScrollReveal('.mission-log', {
        y: 50,
        stagger: 0.15,
        duration: 0.9,
        start: 'top 80%',
    });
}

/**
 * Parallax effect on the floating symbiont orbit visuals
 */
function parallaxOrbits() {
    const orbits = document.querySelectorAll('.symbiont-orbit');
    if (!orbits.length) return;

    orbits.forEach((orbit, i) => {
        const speed = 50 + i * 30;
        gsap.to(orbit, {
            y: -speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    });
}
