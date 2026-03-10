/* ═══════════════════════════════════════════════════════════
   js/sections/gallery.js
   SPIDER-VERSE Gallery
   Random polaroid scatter logic
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

/** Placeholder polaroids */
const GALLERY_ITEMS = [
  { title: 'Dimensions Hack', sub: 'Earth-1610', seed: 'dimhack' },
  { title: 'Web Shooter v2', sub: 'Alchemax Labs', seed: 'webshoot' },
  { title: 'Gwen\'s Drums', sub: 'Earth-65', seed: 'gwendrums' },
  { title: 'Prowler Tech', sub: 'Earth-42', seed: 'prowler' },
  { title: 'Miguel\'s Watch', sub: 'Earth-928', seed: 'miguelwatch' },
  { title: 'Glitch Protocol', sub: 'Earth-1610', seed: 'glitchpro' },
  { title: 'Spider-Bot', sub: 'Earth-1048', seed: 'spiderbot' },
  { title: 'Noir Case File', sub: 'Earth-90214', seed: 'noircase' },
];

export function initGallery() {
  injectCards();

  // Custom reveal for polaroids — drop in from slightly above with rotation
  const polaroids = document.querySelectorAll('.polaroid-card');
  polaroids.forEach((card, i) => {
    // Read the inline rotation we set during injection
    const targetRot = parseFloat(card.dataset.rot || '0');

    gsap.fromTo(card,
      { opacity: 0, y: -50, rotation: targetRot + 15, scale: 1.2 },
      {
        opacity: 1, y: 0, rotation: targetRot, scale: 1,
        duration: 0.8,
        ease: 'bounce.out',
        delay: (i % 4) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        }
      }
    );
  });
}

function injectCards() {
  const grid = document.getElementById('gallery-scatter');
  if (!grid) return;

  grid.innerHTML = GALLERY_ITEMS.map((item, idx) => {
    // Generate a random rotation between -12 and 12 degrees
    const rot = (Math.random() * 24) - 12;
    // Generate a random Y offset for scattered look
    const yOffset = (Math.random() * 40) - 20;

    return `
      <article class="polaroid-card" data-rot="${rot}" style="transform: rotate(${rot}deg) translateY(${yOffset}px)">
        <div class="polaroid-img-wrapper">
          <img
            src="https://picsum.photos/seed/${item.seed}/400/400"
            alt="${item.title}"
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
        <div class="polaroid-caption">
          <h3 class="polaroid-title">${item.title}</h3>
          <span class="polaroid-sub text-cyan">${item.sub}</span>
        </div>
      </article>
    `;
  }).join('');
}
