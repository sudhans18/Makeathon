/* ═══════════════════════════════════════════════════════════
   js/sections/problems.js
   SPIDER-VERSE Problems
   Different Earth Dimensions
═══════════════════════════════════════════════════════════ */

const DIMENSIONS = [
    {
        id: 'earth-1610',
        name: 'Earth-1610',
        label: 'Miles\' Brooklyn',
        desc: 'Urban tech, street art aesthetics, and raw anomaly energy. Build solutions for a vibrant, chaotic city.',
        problems: [
            { title: 'Graffiti AR Network', desc: 'Build an augmented reality app that lets users leave persistent graffiti and messages across city infrastructure.', tag: 'web-hack' },
            { title: 'Invisibility Cloak Interface', desc: 'Design an interface that perfectly blends physical objects with their surroundings using active camouflage logic.', tag: 'hardware' },
            { title: 'Bio-Electric Shock Node', desc: 'Create a system to harvest, store, and safely disperse bio-electric venom blasts for localized power.', tag: 'energy' },
            { title: 'Subway Tracker Anomaly', desc: 'A transit prediction model that accounts for multiversal overlap and chaotic train routing.', tag: 'software' },
        ],
    },
    {
        id: 'earth-65',
        name: 'Earth-65',
        label: 'Gwen\'s Neon City',
        desc: 'Pastel colors, punk rock, and fluid motion. Focus on audio, rhythm, and momentum.',
        problems: [
            { title: 'Rhythm-Based Navigation', desc: 'Design a wayfinding app that uses drum beats and musical cues instead of visual maps.', tag: 'ui/ux' },
            { title: 'Momentum Physics Engine', desc: 'Build a swinging/falling physics simulation that prioritizes style and fluidity over strict realism.', tag: 'code' },
            { title: 'Sonic Dampening Field', desc: 'Create a localized noise-canceling algorithm for punk bands practicing in crowded apartments.', tag: 'audio' },
        ],
    },
    {
        id: 'earth-928',
        name: 'Earth-928',
        label: 'Nueva York (2099)',
        desc: 'Hyper-futuristic, sterile, flying cars. High-tech, high-stakes system infrastructure.',
        problems: [
            { title: 'Multiversal Traffic Control', desc: 'A routing algorithm for flying vehicles operating across vertical z-axis skylanes.', tag: 'algorithm' },
            { title: 'Go-Home Tracker', desc: 'Design a wearable interface that identifies a person\'s home dimension via quantum signature tracing.', tag: 'hardware' },
            { title: 'Holographic A.I. Assistant', desc: 'Build an aggressive but helpful AI (like Lyla) that manages tasks and projects holograms.', tag: 'ai' },
        ],
    },
    {
        id: 'earth-42',
        name: 'Earth-42',
        label: 'The Prowler\'s Domain',
        desc: 'Dark, lawless, survivalist tech. Repurposed gadgets and stealth mechanics.',
        problems: [
            { title: 'Scavenger Supply Chain', desc: 'A decentralized marketplace app for trading repurposed tech parts securely.', tag: 'blockchain' },
            { title: 'Kinetic Boot Stabilizers', desc: 'Design the logic for boots that absorb fall impact and convert it into forward momentum.', tag: 'hardware' },
            { title: 'Encrypted Radio Burst', desc: 'Create a secure, untraceable short-wave communication protocol for underground networks.', tag: 'security' },
            { title: 'Stealth Suit Optics', desc: 'Write software to dynamically alter a suit\'s LED colors to match a real-time video feed of the background.', tag: 'software' },
        ],
    },
];

export function initProblems() {
    renderDimensionTabs();
    activateDimension(DIMENSIONS[0].id);
}

function renderDimensionTabs() {
    const selector = document.getElementById('dimension-selector');
    if (!selector) return;

    selector.innerHTML = DIMENSIONS.map((d) => `
      <button
        class="dimension-tab"
        role="tab"
        data-dimension="${d.id}"
        aria-selected="false"
      >
        ${d.name}
      </button>
    `).join('');

    selector.addEventListener('click', (e) => {
        const tab = e.target.closest('.dimension-tab');
        if (tab) activateDimension(tab.dataset.dimension);
    });
}

function activateDimension(dimId) {
    const dim = DIMENSIONS.find((d) => d.id === dimId);
    if (!dim) return;

    document.querySelectorAll('.dimension-tab').forEach((tab) => {
        const isActive = tab.dataset.dimension === dimId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const panel = document.getElementById('dimension-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="dimension-panel__header">
        <h3 class="dimension-panel__title">${dim.name}: ${dim.label}</h3>
        <p class="dimension-panel__desc">${dim.desc}</p>
      </div>
      <div class="problem-grid">
        ${dim.problems.map((p) => `
          <article class="problem-card">
            <span class="problem-card__tag">${p.tag}</span>
            <h4 class="problem-card__title">${p.title}</h4>
            <p class="problem-card__desc">${p.desc}</p>
          </article>
        `).join('')}
      </div>
    `;

    // Comic pop-in animation
    gsap.fromTo('.problem-card',
        { opacity: 0, scale: 0.8, rotation: () => Math.random() * 6 - 3 },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.5)',
        }
    );
}
