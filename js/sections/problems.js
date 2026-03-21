import { UNIVERSES } from '../data/universes.js';

export function initProblems() {
    const container = document.getElementById('track-selector');
    const ui = document.getElementById('track-selector-ui');

    if (!container || !ui) return;

    const hardware = UNIVERSES.filter((universe) => universe.family === 'hardware');
    const software = UNIVERSES.filter((universe) => universe.family === 'software');

    ui.innerHTML = `
        <div class="track-selector__board">
            <div class="track-selector__copy">
                <h2 class="track-selector__heading">CHOOSE YOUR TRACK</h2>
                <p class="track-selector__sub">Universe 1 to 6 are hardware. Universe 7 to 12 are software.</p>
            </div>

            <div class="track-selector__bridge track-selector__bridge--left" aria-hidden="true"></div>
            <div class="track-selector__bridge track-selector__bridge--right" aria-hidden="true"></div>

            <div class="track-selector__labels">
                <span class="track-selector__label track-selector__label--hardware">HARDWARE</span>
                <span class="track-selector__label track-selector__label--software">SOFTWARE</span>
            </div>

            <div class="track-selector__columns">
                <div class="track-selector__column">
                    <div class="track-selector__grid track-selector__grid--hardware">
                        ${hardware.map((universe) => renderUniverseButton(universe)).join('')}
                    </div>
                </div>

                <div class="track-selector__column">
                    <div class="track-selector__grid track-selector__grid--software">
                        ${software.map((universe) => renderUniverseButton(universe)).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    const buttons = container.querySelectorAll('.track-selector__spider-link');
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(
            buttons,
            { opacity: 0, y: 20, scale: 0.92 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.05,
                ease: 'power3.out',
            }
        );
    }
}

function renderUniverseButton(universe) {
    return `
        <a class="track-selector__spider-link track-selector__spider-link--${universe.family}" href="${universe.href}" aria-label="${universe.label} ${universe.title}">
            <span class="track-selector__spider-tile">
                <img class="track-selector__spider-img" src="${universe.image}" alt="${universe.label}" loading="lazy" />
            </span>
            <span class="track-selector__spider-name">${universe.label}</span>
        </a>
    `;
}
