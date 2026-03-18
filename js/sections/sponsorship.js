/* ═══════════════════════════════════════════════════════════
   js/sections/sponsorship.js
   SPIDER-VERSE Sponsorship Section
   Animated reveal for sponsor CTA and partner cards
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

export function initSponsorship() {
    revealSponsorContent();
    setupTiersButton();
}

/**
 * Staggered reveal for sponsor section elements
 */
function revealSponsorContent() {
    createScrollReveal('.sponsor__headline', {
        y: 40,
        duration: 0.7,
        start: 'top 85%',
    });

    createScrollReveal('.sponsor__card', {
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        start: 'top 85%',
    });

    createScrollReveal('.sponsor__cta-wrapper', {
        y: 30,
        duration: 0.6,
        start: 'top 90%',
    });
}

/**
 * "View Sponsorship Tiers" button — navigate to tiers sub-page
 */
function setupTiersButton() {
    const btn = document.getElementById('btn-view-tiers');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.location.href = 'sponsorship_tiers.html';
    });
}
