/* ═══════════════════════════════════════════════════════════
   js/sections/timeline.js
   Timeline / Descent Sequence section

   Modern scroll-reveal using IntersectionObserver:
   - Cards fade in + slide up when entering the viewport
   - Center line grows as user scrolls through the section
   - Node dots highlight when their card is revealed
═══════════════════════════════════════════════════════════ */

import { prefersReducedMotion } from '../core/utils.js';

/**
 * Initialize Timeline section
 */
export function initTimeline() {
    const section = document.getElementById('timeline');
    if (!section) return;

    if (prefersReducedMotion()) {
        // Show everything immediately for reduced-motion users
        showAllMilestones(section);
        setLineProgress(1);
        return;
    }

    observeMilestones(section);
    trackLineProgress(section);
}

/* ─── Card Reveal Observer ─── */

/**
 * Observe each milestone and toggle .in-view when it enters the viewport
 */
function observeMilestones(section) {
    const milestones = section.querySelectorAll('.timeline__milestone');
    if (!milestones.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Once revealed, stop observing (cards stay visible)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.15,
        }
    );

    milestones.forEach((m) => observer.observe(m));
}

/* ─── Center Line Growth ─── */

/**
 * Track scroll position through the timeline section and update
 * the --line-progress custom property on the fill element (0 → 1).
 */
function trackLineProgress(section) {
    const fill = section.querySelector('.timeline__line-fill');
    if (!fill) return;

    let ticking = false;

    function update() {
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // Start filling when the section's top enters the viewport
        // Finish when the section's bottom reaches the viewport center
        const start = viewportH;          // section top at bottom of viewport
        const end = viewportH * 0.4;      // section bottom at 40% from top

        const scrolled = start - rect.top;
        const total = (rect.height + start) - end;
        const progress = Math.min(Math.max(scrolled / total, 0), 1);

        setLineProgress(progress, fill);
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    update();
}

/* ─── Helpers ─── */

/**
 * Set the line fill progress via CSS custom property
 */
function setLineProgress(value, fill) {
    if (!fill) {
        fill = document.querySelector('.timeline__line-fill');
    }
    if (fill) {
        fill.style.setProperty('--line-progress', value);
    }
}

/**
 * Immediately show all milestones (for reduced-motion)
 */
function showAllMilestones(section) {
    section.querySelectorAll('.timeline__milestone').forEach((m) => {
        m.classList.add('in-view');
    });
}
