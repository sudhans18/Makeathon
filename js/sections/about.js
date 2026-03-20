/* ═══════════════════════════════════════════════════════════
   js/sections/about.js
   SPIDER-VERSE About — Dark Edition
   Staggered panel reveal + pillar pop + count-up animations
═══════════════════════════════════════════════════════════ */

export function initAbout() {
    revealPanels();
    animatePillars();
    animateCountUp();
}

/**
 * Staggered scroll reveal for each about panel
 */
function revealPanels() {
    const panels = document.querySelectorAll('.about-panel');
    if (!panels.length) return;

    panels.forEach((panel, i) => {
        gsap.fromTo(panel,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: i * 0.12,
                scrollTrigger: {
                    trigger: panel,
                    start: 'top 85%',
                    toggleClass: 'in-view',
                },
            }
        );
    });
}

/**
 * Pillars pop in with elastic bounce
 */
function animatePillars() {
    const pillars = document.querySelectorAll('.about-pillar');
    if (!pillars.length) return;

    gsap.fromTo(pillars,
        { opacity: 0, x: -20 },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.6)',
            scrollTrigger: {
                trigger: '.about-panel--mission',
                start: 'top 75%',
            },
        }
    );
}

/**
 * Count-up animation for metric numbers.
 * Reads target, prefix, suffix from data attributes on .about-metric__value.
 * Triggers once when .about-metrics enters the viewport.
 */
function animateCountUp() {
    const metrics = document.querySelectorAll('.about-metric__value[data-count]');
    if (!metrics.length) return;

    // Flash-in the metric cards first, then count
    gsap.fromTo('.about-metric',
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about-metrics',
                start: 'top 80%',
            },
        }
    );

    metrics.forEach((el) => {
        const target  = parseFloat(el.dataset.count);
        const prefix  = el.dataset.prefix  || '';
        const suffix  = el.dataset.suffix  || '';
        const isFloat = !Number.isInteger(target);

        // Proxy object GSAP will tween
        const counter = { val: 0 };

        gsap.to(counter, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,       // only fire once
            },
            onUpdate() {
                const display = isFloat
                    ? counter.val.toFixed(1)
                    : Math.round(counter.val);
                el.textContent = `${prefix}${display}${suffix}`;
            },
            onComplete() {
                // Snap to exact final value
                el.textContent = `${prefix}${target}${suffix}`;
            },
        });
    });
}
