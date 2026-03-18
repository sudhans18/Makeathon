/* ═══════════════════════════════════════════════════════════
   js/main.js — Entry Point
   
   Imports and initializes all core modules and section modules.
   Load order:
   1. GSAP registration (must be first — other modules use ScrollTrigger)
   2. Three.js scene setup (hero needs scene reference)
   3. Lenis smooth scroll (connects to GSAP ticker)
   4. Section initializations in DOM order
   
   To add a new section:
   1. Create js/sections/newSection.js with an init function
   2. Import and call it here in the correct DOM order
   3. Add corresponding CSS file and link in index.html
═══════════════════════════════════════════════════════════ */

// Core
import { registerGSAP } from './core/gsap-init.js';
import { initThree } from './core/three-setup.js';
import { initLenis } from './core/lenis-init.js';

// Sections
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initTimeline } from './sections/timeline.js';
import { initGallery } from './sections/gallery.js';
import { initProblems } from './sections/problems.js';
import { initTeam } from './sections/team.js';
import { initSponsorship } from './sections/sponsorship.js';
import { initFAQ } from './sections/faq.js';

/**
 * Boot sequence — runs when DOM is ready
 */
function boot() {
    // 1. Register GSAP plugins
    try { registerGSAP(); } catch (e) { console.warn('[boot] GSAP init failed:', e); }

    // 2. Initialize Three.js scene on hero canvas
    try { initThree('hero-canvas'); } catch (e) { console.warn('[boot] Three.js init failed:', e); }

    // 3. Start Lenis smooth scrolling
    try { initLenis(); } catch (e) { console.warn('[boot] Lenis init failed:', e); }

    // 4. Initialize sections in DOM order
    initHero();
    initAbout();
    initTimeline();
    initGallery();
    initProblems();
    initTeam();
    initFAQ();

    console.log('[Makeathon 7.0] All systems online. Welcome to the Creation Zone.');
}

// Wait for DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
