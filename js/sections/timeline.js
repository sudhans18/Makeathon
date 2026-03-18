/* ═══════════════════════════════════════════════════════════
   js/sections/timeline.js
   SPIDER-VERSE Timeline — Enhanced

   Features:
   ● Scroll-synced spider crawling down the web line
   ● GSAP scroll-reveal for event cards (bounce + neon flash)
   ● Web strand draw animation (scaleY from top)
   ● Web vibration trigger when cards enter view
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';
import { prefersReducedMotion, isMobile } from '../core/utils.js';

/**
 * Main init — called from main.js boot sequence
 */
export function initTimeline() {
    revealEvents();
    vibrateWebOnReveal();

    if (!prefersReducedMotion()) {
        animateWebStrand();
        if (!isMobile()) {
            animateSpider();
        }
    }
}

/* ─── Card Reveal ─────────────────────────── */
/**
 * Bouncy pop-in reveal for timeline event cards.
 * Odd cards slide from left, even from right.
 */
function revealEvents() {
    const events = document.querySelectorAll('.timeline__event');
    if (!events.length) return;

    events.forEach((el, i) => {
        const isEven = i % 2 !== 0; // nth-child is 1-indexed, index is 0-indexed
        const xOffset = isEven ? 60 : -60;

        gsap.fromTo(el,
            {
                opacity: 0,
                x: xOffset,
                y: 30,
                scale: 0.92,
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleClass: 'in-view',
                },
            }
        );
    });
}

/* ─── Web Vibration ───────────────────────── */
/**
 * Briefly vibrate the web line when each card enters view.
 * Uses IntersectionObserver for lightweight detection.
 */
function vibrateWebOnReveal() {
    const webLine = document.querySelector('.timeline__web-line');
    const events = document.querySelectorAll('.timeline__event');
    if (!webLine || !events.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Trigger vibration class
                webLine.classList.remove('vibrate');
                // Force reflow so the animation restarts
                void webLine.offsetWidth;
                webLine.classList.add('vibrate');
            }
        });
    }, { threshold: 0.3 });

    events.forEach((el) => observer.observe(el));
}

/* ─── Web Strand Draw ─────────────────────── */
/**
 * Draw the web strand downward as the user scrolls
 * through the timeline section (scaleY 0 → 1).
 */
function animateWebStrand() {
    const line = document.querySelector('.timeline__web-line');
    const glow = document.querySelector('.timeline__web-glow');
    if (!line) return;

    // Strand grows downward
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

    // Glow layer follows the strand
    if (glow) {
        gsap.fromTo(glow,
            { scaleY: 0, opacity: 0 },
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
}

/* ─── Spider Scroll Animation ─────────────── */
/**
 * Move the spider element from top to bottom of the
 * timeline track, synced to scroll progress.
 * Uses GSAP ScrollTrigger scrub for smooth tracking.
 */
function animateSpider() {
    const spider = document.querySelector('.timeline__spider');
    const track = document.querySelector('.timeline__track');
    if (!spider || !track) return;

    // Calculate the total distance the spider needs to travel
    // (height of the track minus spider offset)
    gsap.fromTo(spider,
        { top: '20px' },
        {
            top: () => `${track.offsetHeight - 40}px`,
            ease: 'none',
            scrollTrigger: {
                trigger: '#timeline',
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: 0.8,   // Smooth lag behind scroll
                invalidateOnRefresh: true, // Recalc on resize
            },
        }
    );

    // Subtle rotation wiggle as spider crawls
    gsap.to(spider, {
        rotation: 3,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
    });
}
