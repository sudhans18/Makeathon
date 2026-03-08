/* ═══════════════════════════════════════════════════════════
   js/sections/faq.js
   FAQs / Symbiont Oracle
   
   Central glowing orb with floating question crystals
   Click crystal → holographic answer reveal
   
   How to extend: add to FAQ_DATA array
═══════════════════════════════════════════════════════════ */

/** FAQ data */
const FAQ_DATA = [
    {
        q: 'What is a Symbiont?',
        a: 'A Symbiont is a bio-inspired, AI-nanite hybrid concept — a living-tech fusion that bridges biology and technology. In Makeathon 7.0, your team designs and prototypes one across any of the 8 biome categories.',
    },
    {
        q: 'Who can participate?',
        a: 'Anyone with a passion for innovation! Students, professionals, hobbyists, and researchers of all skill levels are welcome. Teams of 2–5 members can register. Solo participants will be matched with a team on launch day.',
    },
    {
        q: 'How long is the event?',
        a: 'Makeathon 7.0 runs for exactly 72 continuous hours. Teams will have checkpoints at T+24:00 and T+48:00 for reviews and mentor feedback before the final submission at T+72:00.',
    },
    {
        q: 'Do I need hardware?',
        a: 'Not necessarily! Many challenges are software-based. However, some biomes (Robotics, Agriculture, MedTech) may benefit from hardware prototyping. We provide basic kits and access to a maker lab on site.',
    },
    {
        q: 'What are the prizes?',
        a: 'Grand prizes include ₹5,00,000+ in cash, internship opportunities, mentorship from industry leaders, cloud credits, and exclusive Symbiont NFT badges. Each biome also has category-specific awards.',
    },
    {
        q: 'Is it free to enter?',
        a: 'Yes! Makeathon 7.0 is completely free. We provide meals, snacks, workspace, Wi-Fi, and all the creative energy you can absorb. Just bring your skills and your team.',
    },
    {
        q: 'Can I use pre-built code?',
        a: 'You may use open-source libraries and frameworks, but the core Symbiont concept and implementation must be created during the 72-hour window. Pre-existing full projects are not permitted.',
    },
    {
        q: 'Where is it held?',
        a: 'Makeathon 7.0 takes place at the Creation Campus — a purpose-built innovation hub. Exact venue details will be shared upon registration confirmation. Remote participation tracks are also available.',
    },
];

/**
 * Initialize the FAQ / Oracle section
 */
export function initFAQ() {
    renderCrystals();
    setupInteraction();
}

/**
 * Render floating question crystals around the orb
 * Positions are distributed in an elliptical pattern
 */
function renderCrystals() {
    const container = document.getElementById('faq-crystals');
    if (!container) return;

    const centerX = 50; // % from left
    const centerY = 50; // % from top
    const radiusX = 38; // Horizontal spread %
    const radiusY = 35; // Vertical spread %

    container.innerHTML = FAQ_DATA.map((item, i) => {
        const angle = (i / FAQ_DATA.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;

        return `
      <button
        class="faq-crystal"
        data-faq="${i}"
        style="left: ${x}%; top: ${y}%; transform: translate(-50%, -50%)"
        aria-label="Question: ${item.q}"
      >
        ${item.q.length > 20 ? item.q.slice(0, 18) + '…' : item.q}
      </button>
    `;
    }).join('');
}

/**
 * Handle crystal clicks: reveal answer with animation
 */
function setupInteraction() {
    const container = document.getElementById('faq-crystals');
    const answerBox = document.getElementById('oracle-answer');
    if (!container || !answerBox) return;

    container.addEventListener('click', (e) => {
        const crystal = e.target.closest('.faq-crystal');
        if (!crystal) return;

        const idx = parseInt(crystal.dataset.faq, 10);
        const item = FAQ_DATA[idx];
        if (!item) return;

        // Toggle active state
        document.querySelectorAll('.faq-crystal').forEach((c) => c.classList.remove('active'));
        crystal.classList.add('active');

        // Render answer with animation
        answerBox.innerHTML = `
      <div class="oracle__answer-inner">
        <h4>${item.q}</h4>
        <p>${item.a}</p>
      </div>
    `;

        // GSAP entrance animation
        gsap.fromTo('.oracle__answer-inner',
            { opacity: 0, y: 15, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
    });
}
