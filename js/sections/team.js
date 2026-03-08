/* ═══════════════════════════════════════════════════════════
   js/sections/team.js
   Our Team / Makeathon Crew
   
   Zero-G floating profile cards with symbiont vein overlay
   Key scroll triggers:
   - Stagger reveal on scroll
   - Float animation once visible
   - Parallax orbit at different speeds per card
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

/** Placeholder team members */
const TEAM = [
    { name: 'Dr. Aria Voss', role: 'Lead Architect', seed: 'ariavoss' },
    { name: 'Kael Rehnquist', role: 'Symbiont Engineer', seed: 'kaelrehn' },
    { name: 'Mira Tanaka', role: 'Biome Designer', seed: 'miratank' },
    { name: 'Zev Okafor', role: 'Nanite Systems Lead', seed: 'zevokafo' },
    { name: 'Luna Petrova', role: 'Neural UX Specialist', seed: 'lunapetro' },
    { name: 'Rho Castellan', role: 'Operations Commander', seed: 'rhocastle' },
    { name: 'Ivy Sun', role: 'Data Symbiosis Analyst', seed: 'ivysunx' },
    { name: 'Orion Beck', role: 'Community Liaison', seed: 'orionbeck' },
    { name: 'Sage Muller', role: 'Creative Director', seed: 'sagemull' },
    { name: 'Atlas Khouri', role: 'Security Sentinel', seed: 'atlaskho' },
];

/**
 * Initialize Team section
 */
export function initTeam() {
    injectCards();
    createScrollReveal('.team-card', {
        y: 50,
        stagger: 0.1,
        duration: 0.7,
        start: 'top 85%',
    });
    setupFloat();
}

/**
 * Inject team cards into the DOM
 */
function injectCards() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = TEAM.map((member) => `
    <article class="team-card">
      <div class="team-card__avatar">
        <img
          src="https://picsum.photos/seed/${member.seed}/300/300"
          alt="${member.name}"
          loading="lazy"
          width="300"
          height="300"
        />
        <div class="team-card__symbiont" aria-hidden="true"></div>
      </div>
      <h3 class="team-card__name">${member.name}</h3>
      <span class="team-card__role">${member.role}</span>
    </article>
  `).join('');
}

/**
 * Add floating class after reveal for zero-G effect
 */
function setupFloat() {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, i) => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                card.classList.add('floating');
                // Vary float animation delay per card
                card.style.animationDelay = `${(i * 0.4) % 3}s`;
            },
        });
    });
}
