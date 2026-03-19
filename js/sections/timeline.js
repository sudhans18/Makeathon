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

    if (!prefersReducedMotion() && !isMobile()) {
        animateSpiderAndWeb();
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

/* ─── Spider & Web Connection Animation ─────────────── */
/**
 * Synchronizes the spider's movement and the web thread's growth
 * to simulate the spider dropping and pulling the thread.
 */
function animateSpiderAndWeb() {
    const spider = document.querySelector('.timeline__spider');
    const track = document.querySelector('.timeline__track');
    const line = document.querySelector('.timeline__web-line');
    const glow = document.querySelector('.timeline__web-glow');
    if (!spider || !track || !line) return;

    // The maximum travel distance for the spider
    const maxTravel = track.offsetHeight - 40;

    // Create a master GSAP Timeline perfectly locked to scroll progress
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#timeline',
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1.2, // Smooth interpolation (lerp-like) across frames
            invalidateOnRefresh: true, // Recalculate if window resizes
        }
    });

    // 1. Spider moves down
    tl.fromTo(spider,
        { top: 0 },
        {
            top: () => `${maxTravel}px`,
            ease: 'power1.inOut' // Natural movement easing
        },
        0 // Insert at absolute start (0) of timeline
    );

    // 2. Web thread perfectly matches spider's location by scaling downwards
    tl.fromTo(line,
        { scaleY: 0 },
        {
            scaleY: () => maxTravel / track.offsetHeight,
            ease: 'power1.inOut' // Exact same easing as spider keeps them locked
        },
        0 // Sync directly with spider movement
    );

    // 3. Web glow perfectly matches spider's location
    if (glow) {
        tl.fromTo(glow,
            { scaleY: 0 },
            { 
                scaleY: () => maxTravel / track.offsetHeight,
                ease: 'power1.inOut'
            },
            0
        );
    }

    // 4. Subtle, continuous tension sway for visual realism
    gsap.to(spider, {
        x: '+=3',           // Micro horizontal oscillation
        rotation: 4,        // Micro rotation
        duration: 1.8,      // Slow swaying
        ease: 'sine.inOut',
        yoyo: true,         // Reverses smoothly
        repeat: -1          // Infinite loop
    });
}
