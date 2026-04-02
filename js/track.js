/* ═══════════════════════════════════════════════════════════
   js/track.js — Domain Track Detail Page
   Reads ?t=hardware or ?t=software from the URL,
   renders a left thumbnail list + right domain detail panel.
═══════════════════════════════════════════════════════════ */
import { UNIVERSES } from './data/universes.js';

const ABSTRACT_PPT_TEMPLATE = 'assets/MAKEATHON%207.0%20ABSTRACT%20PPT%20TEMPLATE.pptx';

/* ── URL param ──────────────────────────────────────────── */
const params = new URLSearchParams(location.search);
const trackFamily = (params.get('t') || 'hardware').toLowerCase();
const domains = UNIVERSES.filter(u => u.family === trackFamily);

/* ── Stat definitions (same order for all domains) ────── */
const STAT_LABELS = [
  { key: 'tech',   label: 'Technical Depth',       icon: '⚙' },
  { key: 'innov',  label: 'Innovation Potential',   icon: '◈' },
  { key: 'impact', label: 'Impact Factor',           icon: '◎' },
  { key: 'scope',  label: 'Implementation Scope',   icon: '▦' },
];

/* Stat values per domain — indexed by domain id */
const DOMAIN_STATS = {
  1:  { tech:88, innov:76, impact:82, scope:70 },
  2:  { tech:80, innov:88, impact:92, scope:74 },
  3:  { tech:74, innov:82, impact:88, scope:78 },
  4:  { tech:72, innov:70, impact:95, scope:66 },
  5:  { tech:92, innov:84, impact:80, scope:72 },
  6:  { tech:78, innov:86, impact:90, scope:76 },
  7:  { tech:94, innov:92, impact:88, scope:80 },
  8:  { tech:82, innov:88, impact:92, scope:84 },
  9:  { tech:70, innov:80, impact:94, scope:88 },
  10: { tech:90, innov:82, impact:86, scope:78 },
  11: { tech:86, innov:96, impact:80, scope:72 },
  12: { tech:82, innov:86, impact:90, scope:80 },
};

/* ── State ──────────────────────────────────────────────── */
let activeIndex = 0;

/* ── DOM refs ───────────────────────────────────────────── */
const leftHeader = document.getElementById('track-left-header');
const leftList   = document.getElementById('track-left-list');
const rightPanel = document.getElementById('track-right');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderProblemDescription(desc) {
  const paragraphs = String(desc)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return '';
  }

  return paragraphs
    .map((part) => `<p class="ps-modal__desc">${escapeHtml(part).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function getProblemId(domain, problemIndex) {
  return `${domain.code.replace('-', '')}${String(problemIndex + 1).padStart(2, '0')}`;
}

/* ══════════════════════════════════════════
   BUILD LEFT PANEL
   ══════════════════════════════════════════ */
function buildLeft() {
  const isHW = trackFamily === 'hardware';
  const label = isHW ? 'Hardware' : 'Software';
  const accent = isHW ? '#ff0040' : '#00f0ff';

  /* Header */
  leftHeader.innerHTML = `
    <div class="track-left__track-name">
      <span>TRACK</span>${label.toUpperCase()}
    </div>
    <div class="track-left__accent-bar" style="background:${accent}"></div>
  `;

  /* Thumbnails */
  leftList.innerHTML = domains.map((d, i) => `
    <div class="track-thumb ${i === activeIndex ? 'is-active' : ''}"
         data-index="${i}"
         role="button"
         tabindex="0"
         aria-label="${d.title}">
      <div class="track-thumb__img-wrap">
        <img class="track-thumb__img"
             src="${d.image}"
             alt="${d.variantName}"
             loading="lazy"
             onerror="this.style.opacity='0'" />
        <span class="track-thumb__index">${d.code}</span>
      </div>
      <div class="track-thumb__text">
        <span class="track-thumb__code">${d.code}</span>
        <span class="track-thumb__title">${d.title}</span>
      </div>
    </div>
  `).join('');

  /* Attach events */
  leftList.querySelectorAll('.track-thumb').forEach(card => {
    const select = () => selectDomain(+card.dataset.index);
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') select(); });
  });
}

/* ══════════════════════════════════════════
   SELECT / RENDER RIGHT PANEL
   ══════════════════════════════════════════ */
function selectDomain(idx) {
  activeIndex = idx;

  /* Scroll right panel to top when switching categories */
  rightPanel.scrollTop = 0;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  /* Update left highlights */
  leftList.querySelectorAll('.track-thumb').forEach((c, i) => {
    c.classList.toggle('is-active', i === idx);
  });

  const d = domains[idx];
  const stats = DOMAIN_STATS[d.id] || { tech: 80, innov: 80, impact: 80, scope: 80 };

    rightPanel.innerHTML = `
    <!-- ── Hero ── -->
    <div class="detail-hero">
      <div class="detail-hero__bg"
           style="background-image:url('${d.background}')"></div>
      <div class="detail-hero__overlay"></div>
      <div class="detail-hero__dots"></div>
      <div class="hero-particles"></div>
      
      <div class="detail-hero__art-wrap flip-card" id="hero-flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img class="detail-hero__art"
                 src="${d.image}"
                 alt="${d.variantName}"
                 loading="eager"
                 onerror="this.style.display='none'" />
          </div>
          <div class="flip-card-back">
            <div class="detail-hero__info-card">
              <span class="detail-hero__info-label">${d.label}</span>
              <strong class="detail-hero__info-name">${d.variantName}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-hero__text">
        <span class="detail-hero__code">${d.code} — TRACK</span>
        <h1 class="detail-hero__name">${d.title}</h1>
        <p class="detail-hero__tagline">${d.tagline}</p>
        <div class="detail-hero__actions" aria-label="Track actions">
          <a class="detail-hero__action detail-hero__action--download" href="${ABSTRACT_PPT_TEMPLATE}" download>
            Download PPT Template
          </a>
          <a class="detail-hero__action detail-hero__action--back" href="index.html#problems">
            <span class="detail-hero__action-arrow" aria-hidden="true">←</span>
            Back to Tracks
          </a>
        </div>
        <div id="spider-signal" class="spider-signal" title="Click for a signal..."></div>
      </div>
    </div>

    <!-- ── Body ── -->
    <div class="detail-body">
      <!-- PROBLEM STATEMENTS -->
      <div class="detail-problems">
        <p class="detail-problems__heading">Problem Statements</p>
        
        <div class="problem-list" style="margin-bottom: 2.5rem;">
          ${d.problems.map((p, pi) => `
            <div class="problem-skill" data-problem-index="${pi}">
              <div class="problem-skill__icon">P${pi + 1}</div>
              <div class="problem-skill__text">
                <span class="problem-skill__id">${getProblemId(d, pi)}</span>
                <span class="problem-skill__name">${p.title}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="rules" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); border-radius: 8px; text-align: left;">
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
    </div><!-- /detail-body -->
  `;

  // Easter Egg: Console
  console.log(`%c [SYSTEM]: Analyzing ${d.code} - ${d.label} ...`, "color: #00f0ff; font-weight: bold; font-size: 12px;");
  if (Math.random() > 0.8) console.log("%c [ALERT]: Multiversal anomaly detected!", "color: #ff0040; font-weight: bold;");

  // Modal logic
  const modal = document.getElementById('ps-modal');
  const modalBody = document.getElementById('ps-modal-body');
  const modalClose = document.getElementById('ps-modal-close');
  const modalOverlay = document.getElementById('ps-modal-overlay');

  const openPSModal = (problem, problemId) => {
    const descHtml = renderProblemDescription(problem.desc);
    const solutionHtml = problem.solution ? `
      <div style="margin-top:1rem;">
        <h3 style="font-family:'Anton',sans-serif; color:#00f0ff; font-size:0.95rem; margin-bottom:0.5rem; letter-spacing:0.05em;">EXPECTED SOLUTION</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          ${problem.solution.map(s => `<li style="padding:0.4rem 0; border-bottom:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.85); font-size:0.82rem;">→ ${s}</li>`).join('')}
        </ul>
      </div>
    ` : '';
    const sdgHtml = problem.sdgs && problem.sdgs.length ? `
      <div style="margin-top:1rem; display:flex; flex-wrap:wrap; gap:8px;">
        ${problem.sdgs.map(s => `<span style="display:inline-block; padding:5px 12px; background:rgba(252,238,10,0.15); border:1px solid rgba(252,238,10,0.5); border-radius:6px; font-family:'Anton',sans-serif; font-size:0.72rem; color:#fcee0a; letter-spacing:0.03em;">${s}</span>`).join('')}
      </div>
    ` : '';
    
    modalBody.innerHTML = `
      <div class="ps-modal__meta">
        <span class="ps-modal__tag">${problem.tag}</span>
        <span class="ps-modal__id">Problem ID: ${problemId}</span>
      </div>
      <h2 class="ps-modal__title" style="padding-right:40px;">${problem.title}</h2>
      ${descHtml}
      ${solutionHtml}
      ${sdgHtml}
    `;
    modal.setAttribute('aria-hidden', 'false');

  };

  const closePSModal = () => {
    modal.setAttribute('aria-hidden', 'true');
  };

  modalClose.onclick = closePSModal;
  modalOverlay.onclick = closePSModal;

  // Particles init
  const pContainer = rightPanel.querySelector('.hero-particles');
  if (pContainer) {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('span');
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 5 + 's';
        pContainer.appendChild(p);
    }
  }

  // Flip Card logic & Tilt
  const flipCard = document.getElementById('hero-flip-card');
  if (flipCard) {
    flipCard.addEventListener('click', () => {
      flipCard.classList.toggle('is-flipped');
      const inner = flipCard.querySelector('.flip-card-inner');
      if (inner) {
        if (flipCard.classList.contains('is-flipped')) {
          inner.style.transform = ''; // allow CSS to handle 180deg flip
        } else {
          inner.style.transform = ''; // allow CSS to settle back to 0
        }
      }
    });

    flipCard.addEventListener('mousemove', (e) => {
        const rect = flipCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const inner = flipCard.querySelector('.flip-card-inner');
        if (inner && !flipCard.classList.contains('is-flipped')) {
            inner.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
        }
    });

    flipCard.addEventListener('mouseleave', () => {
        const inner = flipCard.querySelector('.flip-card-inner');
        if (inner && !flipCard.classList.contains('is-flipped')) {
            inner.style.transform = `rotateY(0) rotateX(0)`;
        }
    });
  }

  // Click listeners for problem items
  rightPanel.querySelectorAll('.problem-skill').forEach(el => {
    el.addEventListener('click', () => {
      const pIdx = Number(el.dataset.problemIndex);
      openPSModal(d.problems[pIdx], getProblemId(d, pIdx));
    });
  });

}

/* ── Init ───────────────────────────────────────────────── */
buildLeft();
selectDomain(0);

/* ── Global Easter Eggs ─────────────────────────────────── */
// Konami Code Web Shooter
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      shootWeb();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function shootWeb() {
  const web = document.createElement('div');
  web.className = 'easter-web';
  document.body.appendChild(web);
  setTimeout(() => web.remove(), 2000);
}



