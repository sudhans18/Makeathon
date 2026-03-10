/* ═══════════════════════════════════════════════════════════
   js/sections/timeline.js
   SPIDER-VERSE Timeline
   Web strand descent drawing and comic boxes pop.
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';
import { prefersReducedMotion } from '../core/utils.js';

export function initTimeline() {
    revealEvents();
    if (!prefersReducedMotion()) {
        animateWebStrand();
    }
}

/**
 * Bouncy pop reveal for the timeline comic boxes
 */
function revealEvents() {
    createScrollReveal('.timeline__event', {
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        start: 'top 85%',
    });
}

/**
 * Draw the cyan web strand downwards as you scroll
 */
function animateWebStrand() {
    const line = document.querySelector('.timeline__web-line');
    if (!line) return;

    gsap.fromTo(line,
        { scaleY: 0, opacity: 0.5 },
        {
            scaleY: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#timeline',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1,
            },
        }
    );
}
