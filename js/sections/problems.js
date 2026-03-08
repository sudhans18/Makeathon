/* ═══════════════════════════════════════════════════════════
   js/sections/problems.js
   Problem Statements / Biome Labs
   
   Interactive biome selector (tab bar) + problem statement cards
   Each biome has distinct visual flavor via data-active-biome attr
   
   How to extend:
   - Add new biomes to BIOMES array
   - Add new problems to each biome's `problems` array
   - Add matching CSS accent in problems.css
═══════════════════════════════════════════════════════════ */

/** Biome definitions with problem statements */
const BIOMES = [
    {
        id: 'ai',
        name: 'AI',
        label: 'Neural Jungle',
        color: '#9b59ff',
        desc: 'Explore the synaptic wilderness — build Symbionts that think, learn, and evolve.',
        problems: [
            { title: 'Adaptive Learning Symbiont', desc: 'Design an AI organism that evolves its teaching strategies based on learner neural patterns.', tag: 'strain' },
            { title: 'Collective Dream Interpreter', desc: 'Build a nanite swarm that aggregates and interprets dream data from multiple hosts.', tag: 'build' },
            { title: 'Emotion Synthesis Engine', desc: 'Create an AI-bio hybrid that can generate and project authentic emotional responses.', tag: 'strain' },
            { title: 'Neural Pathway Optimizer', desc: 'Develop a Symbiont that maps and optimizes neural connections for enhanced cognition.', tag: 'build' },
            { title: 'Symbiotic Code Generator', desc: 'Design an AI system that writes code by mimicking organic nervous system patterns.', tag: 'strain' },
        ],
    },
    {
        id: 'blockchain',
        name: 'Blockchain',
        label: 'Crystal Caves',
        color: '#f0c850',
        desc: 'Unearth crystalline ledgers deep underground — forge trust through transparent symbiosis.',
        problems: [
            { title: 'Bio-Ledger Protocol', desc: 'Create a blockchain backed by biological proof-of-growth instead of computational mining.', tag: 'build' },
            { title: 'Nanite Supply Chain', desc: 'Design a decentralized tracking system for nanite manufacturing using crystal-lattice consensus.', tag: 'strain' },
            { title: 'Symbiont Identity Vault', desc: 'Build a self-sovereign identity system where DNA-encoded keys replace digital wallets.', tag: 'build' },
            { title: 'Resource Token Ecosystem', desc: 'Develop a tokenized economy for exchanging organic resources between Symbiont colonies.', tag: 'strain' },
            { title: 'Immutable Growth Records', desc: 'Create a tamper-proof registry that tracks the evolution history of every deployed Symbiont.', tag: 'build' },
        ],
    },
    {
        id: 'smartcity',
        name: 'Smart City',
        label: 'Holo Spires',
        color: '#00d4ff',
        desc: 'Rise among the holographic towers — design Symbionts that make cities intelligent and alive.',
        problems: [
            { title: 'Traffic Flow Organism', desc: 'Create a city-scale Symbiont that treats traffic as a circulatory system, optimizing flow organically.', tag: 'strain' },
            { title: 'Urban Air Purifier Swarm', desc: 'Design a nanite swarm that cleans urban atmospheres and reports air quality in real-time.', tag: 'build' },
            { title: 'Adaptive Infrastructure', desc: 'Build structures that reshape themselves based on citizen usage patterns and environmental data.', tag: 'strain' },
            { title: 'Citizen Wellbeing Mesh', desc: 'Develop a network Symbiont that continuously senses and adjusts urban environments for comfort.', tag: 'build' },
            { title: 'Waste Decomposer Grid', desc: 'Create a biological waste processing system embedded within smart city infrastructure.', tag: 'strain' },
        ],
    },
    {
        id: 'agriculture',
        name: 'Agriculture',
        label: 'Spore Fields',
        color: '#2ecc71',
        desc: 'Cultivate the living fields — grow Symbionts that nourish, protect, and regenerate soil.',
        problems: [
            { title: 'Crop Whisperer Network', desc: 'Build a root-level communication network between plants that shares nutrient data.', tag: 'build' },
            { title: 'Soil Regeneration Symbiont', desc: 'Design an organism that repairs depleted soil by introducing targeted nanite-mineral composites.', tag: 'strain' },
            { title: 'Pollinator Drone Swarm', desc: 'Create bio-mechanical pollinators that supplement declining natural pollinator populations.', tag: 'build' },
            { title: 'Adaptive Harvest Predictor', desc: 'Develop a Symbiont that predicts optimal harvest windows using real-time growth sensing.', tag: 'strain' },
            { title: 'Water Circulation Organism', desc: 'Design an underground water distribution Symbiont that optimizes irrigation naturally.', tag: 'build' },
        ],
    },
    {
        id: 'medtech',
        name: 'MedTech',
        label: 'Bio Domes',
        color: '#ef4444',
        desc: 'Enter the pulsing bio-domes — engineer Symbionts that heal, adapt, and protect life.',
        problems: [
            { title: 'Nanite Wound Sealer', desc: 'Create medical nanites that detect and seal wounds at a cellular level in real-time.', tag: 'build' },
            { title: 'Immune Boost Symbiont', desc: 'Design an organism that enhances the host immune system during pathogen attack.', tag: 'strain' },
            { title: 'Pain Signal Interceptor', desc: 'Build a bio-interface that intercepts and modulates pain signals for chronic patients.', tag: 'build' },
            { title: 'Organ Repair Colony', desc: 'Develop a Symbiont colony that assists in regenerating damaged organ tissue.', tag: 'strain' },
            { title: 'Diagnostic Parasite', desc: 'Create a benevolent micro-organism that continuously monitors bloodwork and flags anomalies.', tag: 'build' },
            { title: 'Drug Delivery Organism', desc: 'Design a programmable nanite carrier for targeted medication delivery inside the body.', tag: 'strain' },
        ],
    },
    {
        id: 'robotics',
        name: 'Robotics',
        label: 'Exo Dunes',
        color: '#ff8c42',
        desc: 'Traverse the metallic dunes — forge Symbionts that fuse muscle with machine.',
        problems: [
            { title: 'Self-Healing Exoskeleton', desc: 'Build a robotic exoskeleton with organic self-repair capabilities at stress fracture points.', tag: 'build' },
            { title: 'Terrain Adaptation Drone', desc: 'Create a drone Symbiont that restructures its own body to navigate any terrain.', tag: 'strain' },
            { title: 'Swarm Construction Bots', desc: 'Design a colony of micro-robots that coordinate organically to construct structures.', tag: 'build' },
            { title: 'Neural-Linked Prosthetic', desc: 'Develop prosthetics that interface directly with the nervous system for fluid control.', tag: 'strain' },
            { title: 'Salvage Organism', desc: 'Create a robotic Symbiont that disassembles e-waste and recycles components autonomously.', tag: 'build' },
        ],
    },
    {
        id: 'greentech',
        name: 'Green Tech',
        label: 'Wind Forests',
        color: '#00f0d4',
        desc: 'Glide through fractal forests — design Symbionts that harness wind, light, and life.',
        problems: [
            { title: 'Photosynthetic Power Grid', desc: 'Build an energy network powered by engineered photosynthetic organisms.', tag: 'build' },
            { title: 'Carbon Capture Organism', desc: 'Design a Symbiont that absorbs and mineralizes atmospheric carbon at scale.', tag: 'strain' },
            { title: 'Ocean Plastic Decomposer', desc: 'Create a marine nanite swarm that breaks down microplastics into harmless compounds.', tag: 'build' },
            { title: 'Wind Energy Leaf', desc: 'Develop bio-mimetic leaves that convert wind energy into storable electricity.', tag: 'strain' },
            { title: 'Thermal Regulation Moss', desc: 'Design a living moss that regulates building temperatures through bio-thermal control.', tag: 'build' },
        ],
    },
    {
        id: 'education',
        name: 'Education',
        label: 'Orb Spires',
        color: '#6366f1',
        desc: 'Ascend the knowledge spires — create Symbionts that illuminate minds and expand learning.',
        problems: [
            { title: 'Memory Palace Builder', desc: 'Create an AR Symbiont that constructs personalized memory palaces for enhanced retention.', tag: 'build' },
            { title: 'Skill Transfer Protocol', desc: 'Design a neural interface that accelerates skill acquisition through pattern transfer.', tag: 'strain' },
            { title: 'Curiosity Engine', desc: 'Build an AI Symbiont that dynamically generates challenges matched to the learner\'s curiosity graph.', tag: 'build' },
            { title: 'Collaborative Mind Mesh', desc: 'Develop a group learning Symbiont that links student thought processes for shared understanding.', tag: 'strain' },
            { title: 'Knowledge Decay Preventer', desc: 'Create a spaced-repetition organism that detects and reinforces fading memories.', tag: 'build' },
        ],
    },
];

/**
 * Initialize the Problems / Biome Labs section
 */
export function initProblems() {
    renderBiomeTabs();
    activateBiome(BIOMES[0].id);
}

/**
 * Render biome selector tabs
 */
function renderBiomeTabs() {
    const selector = document.getElementById('biome-selector');
    if (!selector) return;

    selector.innerHTML = BIOMES.map((b) => `
    <button
      class="biome-tab"
      role="tab"
      data-biome="${b.id}"
      aria-selected="false"
      aria-controls="biome-panel"
      style="--biome-color: ${b.color}"
    >
      ${b.name} — ${b.label}
    </button>
  `).join('');

    // Click handler for tabs
    selector.addEventListener('click', (e) => {
        const tab = e.target.closest('.biome-tab');
        if (tab) activateBiome(tab.dataset.biome);
    });
}

/**
 * Activate a specific biome: highlight tab + render problems
 * @param {string} biomeId
 */
function activateBiome(biomeId) {
    const biome = BIOMES.find((b) => b.id === biomeId);
    if (!biome) return;

    // Update tabs
    document.querySelectorAll('.biome-tab').forEach((tab) => {
        const isActive = tab.dataset.biome === biomeId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Set data attribute on panel for CSS accent colors
    const panel = document.getElementById('biome-panel');
    if (!panel) return;
    panel.setAttribute('data-active-biome', biomeId);

    // Render problem cards
    panel.innerHTML = `
    <div class="biome-panel__header">
      <h3 class="biome-panel__title" style="color: ${biome.color}">${biome.name}: ${biome.label}</h3>
      <p class="biome-panel__desc">${biome.desc}</p>
    </div>
    <div class="problem-grid">
      ${biome.problems.map((p) => `
        <article class="problem-card">
          <span class="problem-card__tag problem-card__tag--${p.tag}">
            ${p.tag === 'strain' ? 'Symbiont Strain Challenge' : 'Build Required'}
          </span>
          <h4 class="problem-card__title">${p.title}</h4>
          <p class="problem-card__desc">${p.desc}</p>
        </article>
      `).join('')}
    </div>
  `;

    // Animate cards in
    gsap.fromTo('.problem-card',
        { opacity: 0, y: 25 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
        }
    );
}
