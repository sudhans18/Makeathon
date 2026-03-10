/* ═══════════════════════════════════════════════════════════
   js/sections/faq.js
   SPIDER-VERSE FAQ
   Web of Destiny SVG drawing + node clicks
═══════════════════════════════════════════════════════════ */

const FAQ_DATA = [
    { q: 'Is this canon?', a: 'Makeathon 7.0 is an official event sanctioned by the Spider-Society (and your local organizers). Whatever you build here becomes part of your canon event.' },
    { q: 'Who can enter?', a: 'Anyone can wear the mask. Whether you are a student, a seasoned hacker, or an anomaly from another dimension, you are welcome here.' },
    { q: 'What is the team size?', a: 'Teams of 2 to 5 Spiders. Solo travelers will be matched up with a crew during the dimension-sync networking session on Day 1.' },
    { q: 'Is it free?', a: 'Absolutely. We provide the workspace, food, caffeine, and multiversal web-fluid. You just bring your skills and laptop.' },
    { q: 'Do I need a finished product?', a: 'A working prototype or a highly polished concept demo is expected. It doesn\'t have to be perfect, but it needs to show the potential to change the multiverse.' },
    { q: 'What if I glitch out?', a: 'Mentors (our version of Peter B. Parker) are available 24/7 to help you squash bugs and stabilize your reality. Don\'t hesitate to ask for help.' }
];

export function initFAQ() {
    drawWeb();
    setupInteraction();
}

/**
 * Procedurally generate SVG web lines and place HTML nodes over them
 */
function drawWeb() {
    const webSvg = document.getElementById('web-lines');
    const nodesContainer = document.getElementById('faq-nodes');
    if (!webSvg || !nodesContainer) return;

    // Clear
    webSvg.innerHTML = '';
    nodesContainer.innerHTML = '';

    const numNodes = FAQ_DATA.length;
    const centerX = 400; // viewbox is 800x500
    const centerY = 250;

    // SVG lines markup
    let svgContent = '';

    // Center point lines (spokes)
    for (let i = 0; i < numNodes; i++) {
        const angle = (Math.PI * 2 * i) / numNodes - Math.PI / 2;
        const radius = 150 + Math.random() * 80; // Distance from center
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Convert to % for absolute positioning of HTML nodes
        const pctX = (x / 800) * 100;
        const pctY = (y / 500) * 100;

        // Spoke from center
        svgContent += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>`;

        // Connect to next node (web ring)
        const nextI = (i + 1) % numNodes;
        const nextAngle = (Math.PI * 2 * nextI) / numNodes - Math.PI / 2;
        const nextRadius = 150 + Math.random() * 80;
        const nX = centerX + Math.cos(nextAngle) * nextRadius;
        const nY = centerY + Math.sin(nextAngle) * nextRadius;

        svgContent += `<line x1="${x}" y1="${y}" x2="${nX}" y2="${nY}" stroke="#ff0040" stroke-width="3" opacity="0.8"/>`;

        // Create HTML button node
        nodesContainer.innerHTML += `
          <button 
            class="faq-node" 
            data-faq="${i}" 
            style="left: ${pctX}%; top: ${pctY}%;"
            aria-label="Question: ${FAQ_DATA[i].q}"
          ></button>
        `;
    }

    webSvg.innerHTML = svgContent;
}

function setupInteraction() {
    const container = document.getElementById('faq-nodes');
    const bubbleContent = document.getElementById('faq-answer-content');
    if (!container || !bubbleContent) return;

    container.addEventListener('click', (e) => {
        const node = e.target.closest('.faq-node');
        if (!node) return;

        const idx = parseInt(node.dataset.faq, 10);
        const item = FAQ_DATA[idx];
        if (!item) return;

        // Active state
        document.querySelectorAll('.faq-node').forEach((n) => n.classList.remove('active'));
        node.classList.add('active');

        // Update comic bubble content
        bubbleContent.classList.remove('refreshing');

        // Force un-cache animation via reflow
        void bubbleContent.offsetWidth;

        bubbleContent.innerHTML = `
        <h4>${item.q}</h4>
        <p>${item.a}</p>
      `;

        bubbleContent.classList.add('refreshing');
    });
}
