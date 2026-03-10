/* ═══════════════════════════════════════════════════════════
   js/sections/about.js
   SPIDER-VERSE About
   Staggered comic panels popping in.
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

export function initAbout() {
    revealComicPanels();
    setupGraphicPanel();
}

/**
 * Comic panels reveal with bouncy pop scaling
 */
function revealComicPanels() {
    // Uses the global bounce ease registered in gsap-init
    createScrollReveal('.comic-panel', {
        y: 60,
        stagger: 0.2, // Slightly slower stagger for deliberate comic reading pace
        duration: 0.8,
        start: 'top 85%',
    });
}

/**
 * Animate the BAM! POW! graphic sound effect panel
 */
function setupGraphicPanel() {
    const popTexts = document.querySelectorAll('.pop-text');
    if (!popTexts.length) return;

    gsap.fromTo(popTexts,
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            ease: 'elastic.out(1, 0.4)',
            scrollTrigger: {
                trigger: '.panel-4',
                start: 'top 75%',
            }
        }
    );
}
