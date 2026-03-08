/* ═══════════════════════════════════════════════════════════
   js/sections/timeline.js
   Timeline / Descent Sequence section
   
   Key scroll triggers:
   - Milestones reveal sequentially as user scrolls
   - Background gradient shifts (space → re-entry → biome)
   - Subtle page tilt/shake on atmospheric entry
   - Glowing descent line grows downward
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';
import { prefersReducedMotion } from '../core/utils.js';

/**
 * Initialize Timeline section
 */
export function initTimeline() {
    revealMilestones();
    if (!prefersReducedMotion()) {
        animateDescentLine();
        atmosphericShake();
    }
}

/**
 * Stagger-reveal each milestone pod
 */
function revealMilestones() {
    createScrollReveal('.timeline__milestone', {
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        start: 'top 85%',
    });
}

/**
 * Animate the glowing descent line growing downward as user scrolls
 */
function animateDescentLine() {
    const line = document.querySelector('.timeline__line');
    if (!line) return;

    gsap.fromTo(line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
            scaleY: 1,
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

/**
 * Subtle body tilt during the timeline scroll — atmospheric re-entry feel
 */
function atmosphericShake() {
    const section = document.getElementById('timeline');
    if (!section) return;

    // Create a subtle rotation timeline
    const shakeTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: 2,
        },
    });

    shakeTl
        .to(section, { rotateZ: 0.3, duration: 0.3 })
        .to(section, { rotateZ: -0.2, duration: 0.3 })
        .to(section, { rotateZ: 0.15, duration: 0.3 })
        .to(section, { rotateZ: 0, duration: 0.3 });
}
