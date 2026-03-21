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

    // Inject the new Earth-42 spider HTML structure
    spider.innerHTML = `
        <div class="spider__core">
            <div class="spider__body">
                <span class="spider__42">42</span>
            </div>
            <div class="spider__head">
                <div class="spider__fang left"></div>
                <div class="spider__fang right"></div>
            </div>
        </div>
        <div class="spider__legs">
            <div class="s-leg l1"><div class="s-leg-inner"></div></div>
            <div class="s-leg l2"><div class="s-leg-inner"></div></div>
            <div class="s-leg l3"><div class="s-leg-inner"></div></div>
            <div class="s-leg l4"><div class="s-leg-inner"></div></div>
            <div class="s-leg r1"><div class="s-leg-inner"></div></div>
            <div class="s-leg r2"><div class="s-leg-inner"></div></div>
            <div class="s-leg r3"><div class="s-leg-inner"></div></div>
            <div class="s-leg r4"><div class="s-leg-inner"></div></div>
        </div>
    `;

    const timelineSection = document.getElementById('timeline');
    let targetPos = 0;
    let currentPos = 0;

    // Leg animation tracking variables
    let lastCurrentPos = 0;
    let currentStretch = 0;

    const updatePosition = () => {
        const sectionRect = timelineSection.getBoundingClientRect();
        const windowHalf = window.innerHeight / 2;

        // Calculate progress exactly like GSAP start: 'top 50%', end: 'bottom 50%'
        let progress = (windowHalf - sectionRect.top) / sectionRect.height;

        // Clamp progress between 0 and 1 so the web doesn't overshoot
        progress = Math.max(0, Math.min(1, progress));

        const maxTravel = track.offsetHeight - 40;
        targetPos = progress * maxTravel;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
        // Smoothly interpolate current position towards target to prevent jerkiness
        currentPos = lerp(currentPos, targetPos, 0.1);

        // Calculate smooth velocity for leg animation (positive = down, negative = up)
        const velocity = currentPos - lastCurrentPos;
        lastCurrentPos = currentPos;

        // Target stretch bounds between -1 and 1 based on velocity magnitude
        const targetStretch = Math.max(-1, Math.min(1, velocity / 3));
        currentStretch = lerp(currentStretch, targetStretch, 0.15);

        // Apply synchronized position to spider and thread
        spider.style.top = `${currentPos}px`;

        // Drive leg stretch and contract animation simply by updating the CSS variable
        spider.style.setProperty('--leg-stretch', currentStretch.toFixed(3));

        line.style.height = `${currentPos}px`;

        if (glow) {
            glow.style.height = `${currentPos}px`;
        }

        requestAnimationFrame(render);
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    // Initialize values immediately
    updatePosition();
    render();

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
