/* ═══════════════════════════════════════════════════════════
   js/sections/gallery.js
   SPIDER-VERSE Gallery — PAST ANOMALIES
   Scattered polaroid snapshots using real event photos.
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

/** Real past Makeathon event photos */
const GALLERY_ITEMS = [
  { title: 'Opening Ceremony',  sub: 'Makeathon 6.0', img: 'assets/Spideys/1.jpeg'  },
  { title: 'Team Hack Time',    sub: 'Makeathon 6.0', img: 'assets/Spideys/2.jpeg'  },
  { title: 'The Build Phase',   sub: 'Makeathon 5.0', img: 'assets/Spideys/3.jpeg'  },
  { title: 'Wire It Up',        sub: 'Makeathon 5.0', img: 'assets/Spideys/4.jpeg'  },
  { title: 'Demo Day',          sub: 'Makeathon 4.0', img: 'assets/Spideys/5.jpeg'  },
  { title: 'Late Night Grind',  sub: 'Makeathon 4.0', img: 'assets/Spideys/6.jpeg'  },
  { title: 'Judging Round',     sub: 'Makeathon 3.0', img: 'assets/Spideys/7.jpeg'  },
  { title: 'The Reveal',        sub: 'Makeathon 3.0', img: 'assets/Spideys/8.jpeg'  },
  { title: 'Award Ceremony',    sub: 'Makeathon 2.0', img: 'assets/Spideys/9.jpeg'  },
  { title: 'Team Collabs',      sub: 'Makeathon 2.0', img: 'assets/Spideys/10.jpeg' },
  { title: 'The First Spark',   sub: 'Makeathon 1.0', img: 'assets/Spideys/11.jpeg' },
  { title: 'Where It Began',    sub: 'Makeathon 1.0', img: 'assets/Spideys/12.jpeg' },
];

export function initGallery() {
  injectCards();

  // Custom reveal — drop in from above with rotation bounce
  const polaroids = document.querySelectorAll('.polaroid-card');
  polaroids.forEach((card, i) => {
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

  grid.innerHTML = GALLERY_ITEMS.map((item) => {
    const rot     = (Math.random() * 20) - 10;
    const yOffset = (Math.random() * 30) - 15;

    return `
      <article class="polaroid-card" data-rot="${rot.toFixed(2)}" style="transform: rotate(${rot.toFixed(2)}deg) translateY(${yOffset.toFixed(1)}px)">
        <div class="polaroid-img-wrapper">
          <img
            src="${item.img}"
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
