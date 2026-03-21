import { getUniverseById } from './data/universes.js';

const params = new URLSearchParams(window.location.search);
const universe = getUniverseById(params.get('u'));
const accent = universe.family === 'hardware' ? '#ff2d2d' : '#ff5b2e';

const root = document.getElementById('universe-root');
if (root) {
    document.title = `${universe.code} · ${universe.title} | Makeathon 7.0`;
    document.documentElement.style.setProperty('--universe-accent', accent);
    document.documentElement.style.setProperty('--universe-glow', universe.family === 'hardware' ? 'rgba(255,45,45,.45)' : 'rgba(255,91,46,.45)');

    root.innerHTML = `
        <section class="universe-hero section">
            <div class="container universe-hero__grid">
                <div class="universe-hero__copy">
                    <span class="universe-hero__eyebrow">${universe.code} / ${universe.family}</span>
                    <h1 class="universe-hero__title comic-heading">${universe.title}</h1>
                    <p class="universe-hero__subtitle">${universe.subtitle}</p>
                    <p class="universe-hero__body">${universe.family === 'hardware' ? 'Hardware universes focus on build systems, sensing, motion, and physical resilience.' : 'Software universes focus on orchestration, intelligence, interfaces, and trustworthy automation.'}</p>
                    <a class="btn btn-primary universe-hero__back" href="index.html#problems">Return to universe grid</a>
                </div>
                <div class="universe-hero__art">
                    <div class="universe-hero__frame">
                        <img src="${universe.image}" alt="${universe.label}" class="universe-hero__img" />
                    </div>
                </div>
            </div>
        </section>

        <section class="universe-problems section">
            <div class="container">
                <div class="universe-section-head">
                    <span class="universe-section-head__chip">Problem Statements</span>
                    <h2 class="universe-section-head__title">${universe.label}</h2>
                    <p class="universe-section-head__sub">Choose one of the challenge threads below and build a solution that fits this universe.</p>
                </div>
                <div class="universe-grid">
                    ${universe.problems.map((problem, index) => `
                        <article class="universe-card">
                            <span class="universe-card__index">0${index + 1}</span>
                            <span class="universe-card__tag">${problem.tag}</span>
                            <h3 class="universe-card__title">${problem.title}</h3>
                            <p class="universe-card__desc">${problem.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}
