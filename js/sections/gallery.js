/* ═══════════════════════════════════════════════════════════
   js/sections/gallery.js
   Gallery / Previous Editions
   
   Injects placeholder cards from past "Symbiont Prototypes"
   Key scroll triggers:
   - Stagger reveal on scroll
   - Depth parallax per card
   - Hover overlays with circuit/vine visuals
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

/** Placeholder gallery items */
const GALLERY_ITEMS = [
    { title: 'Project Chrysalis', sub: 'Makeathon 6.0 · AI Biome', seed: 'chrysalis' },
    { title: 'Vein Runner', sub: 'Makeathon 6.0 · MedTech Biome', seed: 'veinrunner' },
    { title: 'Coral Sync', sub: 'Makeathon 5.0 · Green Tech', seed: 'coralsync' },
    { title: 'Nano Forge', sub: 'Makeathon 5.0 · Robotics', seed: 'nanoforge' },
    { title: 'Spore Network', sub: 'Makeathon 4.0 · Agriculture', seed: 'sporenet' },
    { title: 'Crystal Ledger', sub: 'Makeathon 4.0 · Blockchain', seed: 'crystalled' },
    { title: 'Mind Lattice', sub: 'Makeathon 3.0 · Education', seed: 'mindlat' },
    { title: 'Wind Weaver', sub: 'Makeathon 3.0 · Smart City', seed: 'windweave' },
    { title: 'Pulse Dome', sub: 'Makeathon 2.0 · MedTech', seed: 'pulsedome' },
    { title: 'Hive Architect', sub: 'Makeathon 2.0 · AI Biome', seed: 'hivearch' },
    { title: 'Root Protocol', sub: 'Makeathon 1.0 · Agriculture', seed: 'rootproto' },
    { title: 'Ember Sentinel', sub: 'Makeathon 1.0 · Robotics', seed: 'embersent' },
];

/**
 * Initialize Gallery section
 */
export function initGallery() {
    injectCards();
    createScrollReveal('.gallery__card', {
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        start: 'top 88%',
    });
    setupParallax();
}

/**
 * Inject gallery cards into the DOM
 */
function injectCards() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = GALLERY_ITEMS.map((item, idx) => `
    <article class="gallery__card" data-depth="${idx % 3}">
      <img
        src="https://picsum.photos/seed/${item.seed}/600/450"
        alt="${item.title} — ${item.sub}"
        loading="lazy"
        width="600"
        height="450"
      />
      <div class="gallery__overlay">
        <span class="gallery__card-sub">${item.sub}</span>
        <h3 class="gallery__card-title">${item.title}</h3>
      </div>
    </article>
  `).join('');
}

/**
 * Subtle parallax depth shift per card based on data-depth
 */
function setupParallax() {
    const cards = document.querySelectorAll('.gallery__card');
    cards.forEach((card) => {
        const depth = parseInt(card.dataset.depth || '0', 10);
        const yShift = 20 + depth * 15;

        gsap.to(card, {
            y: -yShift,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    });
}
