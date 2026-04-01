import { getUniverseById } from './data/universes.js';

const params = new URLSearchParams(window.location.search);
const universe = getUniverseById(params.get('u'));
const accent = universe.family === 'hardware' ? '#ff2d2d' : '#ff5b2e';

const root = document.getElementById('universe-root');
if (root) {
    document.title = `${universe.code} · ${universe.title} | Makeathon 7.0`;
    document.documentElement.style.setProperty('--universe-accent', accent);
    document.documentElement.style.setProperty('--universe-glow', universe.family === 'hardware' ? 'rgba(255,45,45,.45)' : 'rgba(255,91,46,.45)');

    if (universe.background) {
        document.body.style.backgroundImage = `url('${universe.background}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }

    root.innerHTML = `
        <section class="universe-hero section">
            <div class="container">
                <header class="universe-hero__header">
                    <span class="universe-hero__eyebrow">${universe.family}</span>
                    <h1 class="universe-hero__title comic-heading">${universe.title}</h1>
                    <p class="universe-hero__tagline">${universe.tagline}</p>
                </header>

                <div class="universe-hero__grid">
                    <div class="universe-hero__content">
                        <div class="universe-section-head" style="text-align: left; margin: 0 0 1.5rem;">
                            <span class="universe-section-head__chip">Problem Statements</span>
                        </div>
                        <div class="universe-grid" style="grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2.5rem;">
                            ${universe.problems.map((problem, index) => `
                                <article class="universe-card problem-card" data-index="${index}">
                                    <div class="problem-card__header">
                                        <h3 class="universe-card__title">${problem.title}</h3>
                                        <button class="problem-card__toggle" aria-label="Toggle details">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                        </button>
                                    </div>
                                    <div class="problem-card__content">
                                        <span class="universe-card__tag">${problem.tag}</span>
                                        <p class="universe-card__desc">${problem.desc}</p>
                                        ${problem.solution ? `
                                        <div style="margin-top:0.8rem;">
                                          <h4 style="font-family:'Anton',sans-serif; color:#00f0ff; font-size:0.85rem; margin-bottom:0.4rem; letter-spacing:0.04em;">EXPECTED SOLUTION</h4>
                                          <ul style="list-style:none; padding:0; margin:0;">
                                            ${problem.solution.map(s => `<li style="padding:0.3rem 0; border-bottom:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.8); font-size:0.8rem;">→ ${s}</li>`).join('')}
                                          </ul>
                                        </div>
                                        ` : ''}
                                        ${problem.sdgs && problem.sdgs.length ? `
                                        <div style="margin-top:0.8rem; display:flex; flex-wrap:wrap; gap:6px;">
                                          ${problem.sdgs.map(s => `<span style="display:inline-block; padding:4px 10px; background:rgba(252,238,10,0.15); border:1px solid rgba(252,238,10,0.5); border-radius:6px; font-family:'Anton',sans-serif; font-size:0.68rem; color:#fcee0a; letter-spacing:0.03em;">${s}</span>`).join('')}
                                        </div>
                                        ` : ''}
                                    </div>
                                </article>
                            `).join('')}
                        </div>

                        <div id="rules" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.3); border-radius: 8px; text-align: left;">
                          <h4 style="font-family:'Anton',sans-serif; color:#fcee0a; font-size:1.1rem; margin-bottom:0.8rem; letter-spacing:0.04em; text-transform:uppercase;">Rules and Regulations: Participation Guidelines</h4>
                          <div style="color: rgba(255,255,255,0.85); font-size: 0.9rem; line-height: 1.6;">
                            <strong style="color: #00f0ff; letter-spacing:0.03em;">Eligibility:</strong>
                            <ul style="list-style-type: disc; margin-left: 1.2rem; margin-bottom: 1rem;">
                              <li>Open to all undergraduate engineering students</li>
                              <li>Teams must be from the same college only (inter-college teams are not permitted)</li>
                              <li>Inter-department teams are allowed</li>
                            </ul>

                            <strong style="color: #00f0ff; letter-spacing:0.03em;">Team Composition:</strong>
                            <ul style="list-style-type: disc; margin-left: 1.2rem; margin-bottom: 1rem;">
                              <li>Minimum: 4 members</li>
                              <li>Maximum: 6 members</li>
                            </ul>

                            <strong style="color: #00f0ff; letter-spacing:0.03em;">Rules:</strong>
                            <ul style="list-style-type: disc; margin-left: 1.2rem; margin-bottom: 1rem;">
                              <li>Organizers will not provide any hardware components or software tools</li>
                              <li>PPT template must be followed strictly (no extra slides should be added)</li>
                              <li>The abstract must not exceed 10 slides</li>
                              <li>Upload your solutions in PDF format only</li>
                              <li>Only the team leader must fill the form on behalf of the team</li>
                              <li>Ensure that the Google Drive document you upload has Viewer/Open access enabled for all</li>
                            </ul>

                            <strong style="color: #00f0ff; letter-spacing:0.03em;">Queries:</strong>
                            <ul style="list-style-type: disc; margin-left: 1.2rem; margin-bottom: 0;">
                              <li>For further queries, please refer to the <a href="index.html#faq">FAQ</a> page</li>
                            </ul>
                          </div>
                        </div>
                    </div>

                    <div class="universe-hero__art">
                        <div class="universe-hero__frame">
                            <img src="${universe.image}" alt="${universe.label}" class="universe-hero__img" />
                        </div>
                        <div style="margin-top: 1.5rem; text-align: center;">
                            <strong class="universe-hero__variant">${universe.variantName}</strong>
                            <p class="universe-hero__label" style="margin-top: 0.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.6);">${universe.label}</p>
                        </div>
                    </div>
                </div>

                <div class="universe-hero__quote-section">
                    <p class="universe-hero__why">${universe.whyContent}</p>
                </div>
            </div>
        </section>
    `;

    // Add interactivity for problem cards
    const cards = root.querySelectorAll('.problem-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const isExpanded = card.classList.contains('is-expanded');
            
            // If they click the card, toggle it. 
            // The user mentioned other boxes expanding, which might be a misunderstanding of how grid heights work.
            // I'll ensure we only toggle the current one.
            if (!isExpanded) {
                // Optional: Close others for a clean accordion look
                cards.forEach(c => c.classList.remove('is-expanded'));
                card.classList.add('is-expanded');
            } else {
                card.classList.remove('is-expanded');
            }
        });
    });
}
